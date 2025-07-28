// modules/readFileAsync.js
const fs = require("fs").promises;

async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (err) {
    throw new Error(`Failed to read file at ${filePath}: ${err.message}`);
  }
}

module.exports = readFileAsync;
