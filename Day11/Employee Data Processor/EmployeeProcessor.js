const XLSX = require("xlsx"); // XLSX library for Excel file handling
const fs = require("fs"); // File system module for checking file existence

// Step 1: Read the Excel file
const inputFile = "employee_data_.xlsx";
const outputFile = "employee_data_with_bonus.xlsx";

try {
  // Check if file exists
    if (!fs.existsSync(inputFile)) {
        console.error(`❌ File not found: ${inputFile}`);
        process.exit(1);
    }

  // Step 2: Read workbook and first worksheet
    const workbook = XLSX.readFile(inputFile); // Read the Excel file
    const sheetName = workbook.SheetNames[0]; // Get the first sheet name
    const worksheet = workbook.Sheets[sheetName]; // Get the first worksheet

  // Step 3: Convert to JSON array
    const data = XLSX.utils.sheet_to_json(worksheet);

  // Step 4: Process each employee
    const updatedData = data.map((employee) => {
    const salary = employee.AnnualSalary;
    let bonusPercentage = 0;

    if (salary < 50000) {
        bonusPercentage = 5;
        } else if (salary <= 100000) {
        bonusPercentage = 7;
        } else {
        bonusPercentage = 10;
        }

    const bonusAmount = (salary * bonusPercentage) / 100;

    return {
        ...employee,
        BonusPercentage: `${bonusPercentage}%`,
        BonusAmount: bonusAmount,
    };
    });

    // Step 5: Convert JSON back to worksheet
    const newWorksheet = XLSX.utils.json_to_sheet(updatedData);

    // Step 6: Create new workbook and append worksheet
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Bonuses");

    // Step 7: Write to new Excel file
    XLSX.writeFile(newWorkbook, outputFile);
    console.log(`✅ Bonus calculations saved to: ${outputFile}`);
}  catch (error) {
    console.error("❌ An error occurred:", error.message);
}
