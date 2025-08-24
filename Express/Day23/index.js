const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// Session setup
app.use(
    session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // set true if HTTPS
    })
);

// Server variable to store registered users
const users = [];

// 📌 Register Route
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    if (users.find((u) => u.username === username)) {
        return res.status(400).send("Username already taken");
    }

    // Store user in server variable
    // Hash the password before storing
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    res.send("User registered successfully");
});

// 📌 Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).send("Invalid credentials");
    }
    const match = bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).send("Invalid credentials");
    }

    // store session
    req.session.user = { username };
    res.send("Login successful");
});

//  Protected Route
app.get("/profile", (req, res) => {
    if (req.session.user) {
        res.send(`Welcome ${req.session.user.username}`);
    } else {
        res.status(401).send("Unauthorized");
    }
});

// Logout Route
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Could not log out");
        res.clearCookie("connect.sid"); // clear session cookie
        res.send("Logged out successfully");
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
