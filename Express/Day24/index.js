const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// ---------------- Session Setup ----------------
app.use(
    session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // true if HTTPS
    })
);

app.use(passport.initialize());
app.use(passport.session());

// ---------------- Fake User Database ----------------
const users = []; // stored in memory, not DB

// ---------------- Passport Local Strategy ----------------
passport.use(
    new LocalStrategy((username, password, done) => {
        const user = users.find((u) => u.username === username);
        if (!user) return done(null, false, { message: "User not found" });

        // compare hashed password
        bcrypt.compare(password, user.password, (err, result) => {
        if (err) return done(err);
        if (!result) return done(null, false, { message: "Wrong password" });
        return done(null, user);
        });
    })
);

// ---------------- Passport Serialize/Deserialize ----------------
passport.serializeUser((user, done) => {
    done(null, user.id);
    
});

passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user);
});

// ---------------- Middleware: Check if Logged In ----------------
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).send("Unauthorized");
}

// ---------------- Routes ----------------

// 📌 Register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (users.find((u) => u.username === username)) {
        return res.status(400).send("Username already taken");
    }

  // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
    };
    users.push(newUser);

    res.send("User registered successfully ✅");
});

// 📌 Login
app.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(`Login successful. Welcome ${req.user.username} 🎉`);
});

// 📌 Protected Profile
app.get("/profile", ensureAuth, (req, res) => {
    res.send(`Hello ${req.user.username}, this is your profile page 🔒`);
});

// 📌 Update Profile (Bonus)
app.put("/profile", ensureAuth, (req, res) => {
    const { username } = req.body;
    req.user.username = username || req.user.username;
    res.send("Profile updated ✅");
});

// 📌 Logout
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send("Could not log out");
        res.clearCookie("connect.sid");
        res.send("Logged out successfully 👋");
    });
});

// ---------------- Start Server ----------------
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
