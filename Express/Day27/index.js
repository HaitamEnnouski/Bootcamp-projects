const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mydb")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ Error connecting:", err));

// Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// Create a new user
async function createUser() {
    try {
        const newUser = new User({
        name: "Mike Ross",
        email: "mike.ross@arkx.group",
        age: 30
        });
        const saved = await newUser.save();
        console.log("✅ User saved:", saved);
    } catch (err) {
        if (err.code === 11000) {
        console.error("❌ Error: Email already exists!");
        } else {
        console.error("❌ Error saving user:", err.message);
        }
    }
}

// Fetch users with pagination
async function getUsers(page = 1, limit = 2) {
    try {
        const users = await User.find({})
        .skip((page - 1) * limit)
        .limit(limit);
        console.log(`✅ Page ${page} Users:`, users);
    } catch (err) {
        console.error("❌ Error fetching users:", err.message);
    }
}

// Find by name
async function findUser(query) {
    try {
        const user = await User.findOne(query);
        if (user) {
        console.log("✅ User found:", user);
        } else {
        console.log("❌ User not found");
        }
    } catch (err) {
        console.error("❌ Error finding user:", err.message);
    }
}


// Update user email by name
async function updateUserEmail(name, newEmail) {
    try {
        const user = await User.findOneAndUpdate(
        { name },
        { $set: { email: newEmail } },
        { new: true }
        );
        if (user) console.log("✅ User updated:", user);
        else console.log("❌ User not found");
    } catch (err) {
        console.error("❌ Error updating user:", err.message);
    }
}

// Delete users created before a certain date
async function deleteOldUsers(date) {
  try {
    const result = await User.deleteMany({ createdAt: { $lt: date } });
    console.log(`✅ Number of users deleted: ${result.deletedCount}`);
  } catch (err) {
    console.error("❌ Error deleting users:", err.message);
  }
}

// ---- TEST FUNCTIONS ----
(async () => {
    await createUser();
    await getUsers(1, 2); // page 1, limit 2
    await findUser({ name: "Mike Ross" });       // find by name
    await findUser({ email: "mike.ross@arkx.group" }); // find by email
    await updateUserEmail("Mike Ross", "mike.new@arkx.group");

  // Delete users created more than 7 days ago
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await deleteOldUsers(oneWeekAgo);

  mongoose.connection.close();
})();
