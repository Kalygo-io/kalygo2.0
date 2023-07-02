const fs = require("fs");
const { Translate } = require("@google-cloud/translate").v2;
const sourceFolderPath = "public/locales/en";
const outputPath = "public/locales";
// Anthony's Google Cloud credentials. Change before pushing to production
const projectId = "kalygotranslation2";
const keyFilename = "keyfile.json";
const translate = new Translate({ projectId, keyFilename });
// Function to translate a single file
async function translateFile(file, targetLanguage) {
  try {
    const text = fs.readFileSync(`${sourceFolderPath}/${file}`, "utf8");
    const [translation] = await translate.translate(text, targetLanguage);
    const outputFile = `${outputPath}/${targetLanguage}/${file}`;
    fs.writeFileSync(outputFile, translation, "utf8");
    console.log(`Translated ${file} to ${targetLanguage}`);
  } catch (error) {
    console.error(`Translation error: ${error}`);
  }
}
// translate all files in the source folder
async function translateFiles(targetLanguage) {
  try {
    const files = fs.readdirSync(sourceFolderPath);
    for (const file of files) {
      await translateFile(file, targetLanguage);
    }
  } catch (error) {
    console.error(`Error reading source folder: ${error}`);
  }
}
const targetLanguage = "fr"; // 1 language at a time, folder for targeted language needs to be created first.

translateFiles(targetLanguage);
