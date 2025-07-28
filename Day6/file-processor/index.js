// index.js
const processFiles = require('./modules/processFiles');

(async () => {
    console.log("📂 Starting file processing...\n");
    await processFiles();
    console.log("\n✅ All files processed.");
})();
