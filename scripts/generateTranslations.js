const fs = require("fs");
const get = require("lodash.get");
const { Translate } = require("@google-cloud/translate").v2;
const sourceFolderPath = "public/locales/en";
const outputPath = "public/locales";

// personal credentials, update before pushing to production
const projectId = "kalygotranslation2";
const keyFilename = "keyfile.json";
const targetLanguages = ["en", "es", "pt", "fr"];

const translate = new Translate({ projectId, keyFilename });

// function to translate values in files
async function translateJSONValues(file, val, targetLanguage, path) {
  console.log("translateJSONValues");

  if (typeof val === "string") {
    // snapshot // path
    console.log("path", path);

    let snapshotJSON;
    if (fs.existsSync(`${sourceFolderPath}/${file}.snapshot`)) {
      snapshotJSON = JSON.parse(
        fs.readFileSync(`${sourceFolderPath}/${file}.snapshot`, "utf8")
      );
    }

    const oldValue = get(snapshotJSON, path);
    const newValue = val;

    console.log("oldValue", snapshotJSON, oldValue, path);
    console.log("newValue", val, newValue, path);

    if (oldValue !== newValue) {
      console.log("HERE");

      const [translation] = await translate.translate(val, targetLanguage);
      return translation;
    } else {
      return oldValue;
    }
  } else if (Array.isArray(val)) {
    const translatedArray = [];
    for (const key in val) {
      console.log("key", key);

      const translatedItem = await translateJSONValues(
        file,
        val[key],
        targetLanguage,
        `${path}.${key}`
      );
      translatedArray.push(translatedItem);
    }
    return translatedArray;
  } else if (typeof val === "object") {
    const translatedObject = {};
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        const value = val[key];
        const translatedValue = await translateJSONValues(
          file,
          value,
          targetLanguage,
          path ? `${path}.${key}` : `${key}`
        );
        translatedObject[key] = translatedValue;
      }
    }
    return translatedObject;
  } else {
    return val;
  }
}

async function createFiles(targetLanguage) {
  try {
    const files = fs.readdirSync(sourceFolderPath);
    for (const file of files) {
      const inputFilePath = `${sourceFolderPath}/${file}`;
      const outputFolderPath = `${outputPath}/${targetLanguage}`;
      if (!fs.existsSync(outputFolderPath)) {
        fs.mkdirSync(outputFolderPath, { recursive: true });
      }
      const outputFilePath = `${outputFolderPath}/${file}`;
      const inputJSON = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));
      const translatedJSON = await translateJSONValues(
        file,
        inputJSON,
        targetLanguage,
        ""
      );

      // save snapshot
      fs.writeFileSync(
        `${sourceFolderPath}/${file}.snapshot`,
        JSON.stringify(inputJSON, null, 2),
        "utf8"
      );

      fs.writeFileSync(
        outputFilePath,
        JSON.stringify(translatedJSON, null, 2),
        "utf8"
      );
      console.log(`Translated ${file} to ${targetLanguage}`);

      break;
    }
  } catch (error) {
    console.error(`Error reading source folder: ${error}`);
  }
}

// new function made to handle languages in parallel
async function translateFilesParallel(targetLanguages) {
  const promises = targetLanguages.map((targetLanguage) =>
    createFiles(targetLanguage)
  );
  await Promise.all(promises);
}

translateFilesParallel(targetLanguages);
