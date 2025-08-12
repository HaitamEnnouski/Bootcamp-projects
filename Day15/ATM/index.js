const fs = require("fs");
const readline = require("readline");
const EventEmitter = require("events");
const path = require("path");

// Always point to the correct users.json in the same folder as index.js
const USERS_FILE = path.join(__dirname, "users.json");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const atm = new EventEmitter();

// Read users from JSON
function loadUsers() {
    const data = fs.existsSync(USERS_FILE) ? fs.readFileSync(USERS_FILE) : "[]";
    return JSON.parse(data);
}

// Save users to JSON
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Generate random PIN
function generatePIN() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Generate unique account ID
function generateAccountID(users) {
    let id;
    do {
        id = "ACC" + Math.floor(100000 + Math.random() * 900000);
    } while (users.some((u) => u.accountID === id));
    return id;
}

// Add new user
function addUser() {
    rl.question("Enter your name: ", (name) => {
        const users = loadUsers();
        const accountID = generateAccountID(users);
        const pin = generatePIN();

        users.push({
            name,
            accountID,
            pin,
            balance: 0,
            transactions: [],
        });

        saveUsers(users);
        console.log("\n✅ User created!");
        console.log("Account ID:", accountID);
        console.log("PIN:", pin);
        rl.close();
    });
}

// Authenticate user
function loginUser() {
    rl.question("Enter your account ID: ", (accountID) => {
        rl.question("Enter your 4-digit PIN: ", (pin) => {
            const users = loadUsers();
            const user = users.find((u) => u.accountID === accountID && u.pin === pin);

            if (user) {
                console.log(`\n✅ Welcome, ${user.name}!`);
                atmMenu(user);
            } else {
                console.log("❌ Invalid credentials.");
                rl.close();
            }
        });
    });
}

// ATM menu
function atmMenu(user) {
    console.log("\n--- ATM Menu ---");
    console.log("1. Check Balance");
    console.log("2. Deposit");
    console.log("3. Withdraw");
    console.log("4. View Transactions");
    console.log("5. Exit");

    rl.question("Choose an option: ", (choice) => {
        switch (choice) {
            case "1":
                atm.emit("checkBalance", user);
                break;
            case "2":
                atm.emit("deposit", user);
                break;
            case "3":
                atm.emit("withdraw", user);
                break;
            case "4":
                atm.emit("viewTransactions", user);
                break;
            case "5":
                console.log("👋 Goodbye!");
                rl.close();
                break;
            default:
                console.log("❌ Invalid option.");
                atmMenu(user);
        }
    });
}

// Event handlers
atm.on("checkBalance", (user) => {
    console.log(`💰 Your current balance is: $${user.balance}`);
    atmMenu(user);
});

atm.on("deposit", (user) => {
    rl.question("Enter amount to deposit: ", (input) => {
        const amount = parseFloat(input);
        if (isNaN(amount) || amount <= 0) {
            console.log("❌ Invalid amount.");
            return atmMenu(user);
        }

        user.balance += amount;
        user.transactions.push({
            type: "Deposit",
            amount,
            date: new Date().toISOString(),
        });

        updateUser(user);
        console.log(`✅ Deposited $${amount}`);
        atmMenu(user);
    });
});

atm.on("withdraw", (user) => {
    rl.question("Enter amount to withdraw: ", (input) => {
        const amount = parseFloat(input);
        if (isNaN(amount) || amount <= 0) {
            console.log("❌ Invalid amount.");
            return atmMenu(user);
        }

        if (amount > user.balance) {
            console.log("❌ Insufficient funds.");
            return atmMenu(user);
        }

        user.balance -= amount;
        user.transactions.push({
            type: "Withdraw",
            amount,
            date: new Date().toISOString(),
        });

        updateUser(user);
        console.log(`✅ Withdrew $${amount}`);
        atmMenu(user);
    });
});

atm.on("viewTransactions", (user) => {
    if (user.transactions.length === 0) {
        console.log("📭 No transactions yet.");
    } else {
        console.log("\n📄 Transaction History:");
        user.transactions.forEach((t, i) => {
            console.log(`${i + 1}. ${t.type} of $${t.amount} on ${t.date}`);
        });
    }
    atmMenu(user);
});

// Update one user in JSON
function updateUser(updatedUser) {
    const users = loadUsers();
    const index = users.findIndex((u) => u.accountID === updatedUser.accountID);
    users[index] = updatedUser;
    saveUsers(users);
}

// Start
function main() {
    console.log("📟 ATM Management System");
    console.log("1. Add New User");
    console.log("2. Login");

    rl.question("Choose an option: ", (choice) => {
        if (choice === "1") {
            addUser();
        } else if (choice === "2") {
            loginUser();
        } else {
            console.log("❌ Invalid choice.");
            rl.close();
        }
    });
}

main();
