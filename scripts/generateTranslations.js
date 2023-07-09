const fs = require("fs");
const { Translate } = require("@google-cloud/translate").v2;
const sourceFolderPath = "public/locales/en";
const outputPath = "public/locales";

// personal credentials, update before pushing to production
const projectId = "kalygotranslation2";
const keyFilename = "keyfile.json";
const targetLanguages = ["en", "es", "pt", "fr"];

const translate = new Translate({ projectId, keyFilename });

// Function to check if JSON file content is different from the corresponding TXT file content
function isContentDifferent(jsonContent, txtContent) {
  return jsonContent !== txtContent;
}

// Function to generate or update TXT files for the English (en) language
async function generateOrUpdateTxtFiles() {
  try {
    const enFiles = fs.readdirSync(sourceFolderPath);
    const modifiedFiles = [];

    for (const file of enFiles) {
      if (file.endsWith(".json")) {
        const inputFilePath = `${sourceFolderPath}/${file}`;
        const outputTxtFolderPath = `${outputPath}/en`;
        const outputTxtFilePath = `${outputTxtFolderPath}/${file.replace(".json", ".txt")}`;

        if (!fs.existsSync(outputTxtFolderPath)) {
          fs.mkdirSync(outputTxtFolderPath, { recursive: true });
        }

        const inputJSON = fs.readFileSync(inputFilePath, "utf8");
        const outputTxtContent = fs.existsSync(outputTxtFilePath)
          ? fs.readFileSync(outputTxtFilePath, "utf8")
          : null;

        if (isContentDifferent(inputJSON, outputTxtContent)) {
          fs.writeFileSync(outputTxtFilePath, inputJSON, "utf8");
          console.log(`Generated or updated ${file.replace(".json", ".txt")}`);
          modifiedFiles.push(file);
        }
      }
    }

    return modifiedFiles;
  } catch (error) {
    console.error(`Error generating or updating .txt files: ${error}`);
    return [];
  }
}

// Function to translate values in JSON files for the specified target language
async function translateJSONFiles(targetLanguage, modifiedFiles) {
  try {
    for (const file of modifiedFiles) {
      const inputFilePath = `${sourceFolderPath}/${file}`;
      const outputFolderPath = `${outputPath}/${targetLanguage}`;
      const outputFilePath = `${outputFolderPath}/${file}`;

      if (!fs.existsSync(outputFolderPath)) {
        fs.mkdirSync(outputFolderPath, { recursive: true });
      }

      const inputJSON = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));
      const outputTxtFilePath = `${outputPath}/en/${file.replace(".json", ".txt")}`;
      const outputTxtContent = fs.existsSync(outputTxtFilePath)
        ? fs.readFileSync(outputTxtFilePath, "utf8")
        : null;

      if (isContentDifferent(JSON.stringify(inputJSON), outputTxtContent)) {
        const translatedJSON = await translateJSONValues(inputJSON, targetLanguage);
        fs.writeFileSync(outputFilePath, JSON.stringify(translatedJSON, null, 2), "utf8");
        console.log(`Translated ${file} to ${targetLanguage}`);
      }
    }
  } catch (error) {
    console.error(`Error reading source folder: ${error}`);
  }
}

// Function to translate values in JSON files
async function translateJSONValues(json, targetLanguage) {
  if (typeof json === "string") {
    const [translation] = await translate.translate(json, targetLanguage);
    return translation;
  } else if (Array.isArray(json)) {
    const translatedArray = [];
    for (const item of json) {
      const translatedItem = await translateJSONValues(item, targetLanguage);
      translatedArray.push(translatedItem);
    }
    return translatedArray;
  } else if (typeof json === "object") {
    const translatedObject = {};
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const value = json[key];
        const translatedValue = await translateJSONValues(value, targetLanguage);
        translatedObject[key] = translatedValue;
      }
    }
    return translatedObject;
  } else {
    return json;
  }
}

async function translateFilesParallel(targetLanguages) {
  const modifiedFiles = await generateOrUpdateTxtFiles();

  const promises = targetLanguages.map(async (targetLanguage) => {
    if (targetLanguage !== "en") {
      await translateJSONFiles(targetLanguage, modifiedFiles);
    }
  });

  await Promise.all(promises);
}

translateFilesParallel(targetLanguages);