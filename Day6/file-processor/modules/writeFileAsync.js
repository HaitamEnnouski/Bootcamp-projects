// modules/writeFileAsync.js
const fs = require('fs').promises;

async function writeFileAsync(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf-8');
        return true;
    } catch (err) {
        throw new Error(`Failed to write file at ${filePath}: ${err.message}`);
    }
}

module.exports = writeFileAsync;
