const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; // MongoDB runs on port 27017 by default
const client = new MongoClient(url);

async function run() {
    try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Create database and collection
    const db = client.db("mydb");
    const users = db.collection("users");

    // Insert 3 users
    const result = await users.insertMany([
        { name: "Alice", age: 23 },
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 27 },
    ]);
    console.log("✅ Users inserted:", result.insertedCount);

    // Retrieve all users
    const allUsers = await users.find().toArray();
    console.log("✅ All Users:");
    console.log(allUsers);

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await client.close(); // Close connection
    }
}

run();
