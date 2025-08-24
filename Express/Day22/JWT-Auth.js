const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator"); 

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

app.post("/login",
    // Validate and sanitize input
    [
        body("username").trim().escape().isLength({ min: 3 }),
        body("password").trim().escape().isLength({ min: 3 }),
    ],(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        if (username === "user" && password === "123") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
        }

        res.status(401).json({ message: "Invalid credentials" });
}
);

function authenticateToken(req, res, next) {
const token = req.headers["authorization"]?.split(" ")[1];
if (!token) return res.sendStatus(401);

jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
});
}

app.get("/profile", authenticateToken, (req, res) => {
res.json({ message: "Welcome!", user: req.user });
});

// ✅ Error handler
app.use((err, req, res, next) => {
res.status(500).json({ message: "Something went wrong!" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
