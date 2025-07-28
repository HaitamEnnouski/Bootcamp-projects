// modules/processFiles.js
const path = require('path');
const readFileAsync = require('./readFileAsync');
const writeFileAsync = require('./writeFileAsync');

async function processFiles() {
    const fileNames = ['file1.txt', 'file2.txt'];
    const inputDir = path.join(__dirname, '..', 'files');
    const outputDir = path.join(__dirname, '..', 'files');

    for (const file of fileNames) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `modified-${file}`);

    try {
        const content = await readFileAsync(inputPath);

        // Example manipulation: add timestamp and convert to uppercase
        const timestamp = new Date().toISOString();
        const modified = `[${timestamp}]\n${content.toUpperCase()}`;

        await writeFileAsync(outputPath, modified);
        console.log(`✅ Processed: ${file}`);
        } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
        }
    }
}

module.exports = processFiles;
