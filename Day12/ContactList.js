const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const contacts = [];

function showMenu() {
    console.log("\nContact Manager");
    console.log("===================");
    console.log("1. Add Contact");
    console.log("2. View All Contacts");
    console.log("3. Search Contact");
    console.log("4. Exit");

    rl.question("Enter your choice: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice.trim()) {
        case "1":
            addContact();
            break;
        case "2":
            viewContacts();
            break;
        case "3":
            searchContact();
            break;
        case "4":
            console.log("Exiting... Goodbye!");
            rl.close();
            break;
        default:
            console.log("Invalid choice. Please try again.");
            showMenu();
    }
}

function addContact() {
    rl.question("Enter contact name: ", (name) => {
    rl.question("Enter phone number: ", (phone) => {
        contacts.push({ name, phone });
        console.log(`Contact added: ${name} - ${phone}`);
        showMenu();
        });
    });
}

function viewContacts() {
    if (contacts.length === 0) {
        console.log("No contacts found.");
    } else {
        console.log("\nYour Contacts:");
        contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.name} - ${contact.phone}`);
        });
    }
    showMenu();
}

function searchContact() {
    rl.question("Enter name to search: ", (name) => {
        const contact = contacts.find(
        (c) => c.name.toLowerCase() === name.trim().toLowerCase()
        );
        if (contact) {
        console.log(`Found: ${contact.name} - ${contact.phone}`);
        } else {
        console.log("Contact not found.");
        }
        showMenu();
    });
}

// Start the app
showMenu();
