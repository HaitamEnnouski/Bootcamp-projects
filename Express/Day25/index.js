const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();
app.use(express.json());

// ---------------- Session Setup ----------------
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ---------------- Fake User Database ----------------
const users = []; // {id, username, password, provider}

// ---------------- Passport Local Strategy ----------------
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username && u.provider === "local");
    if (!user) return done(null, false, { message: "User not found" });
    if (user.password !== password) return done(null, false, { message: "Wrong password" });
    return done(null, user);
  })
);

// ---------------- Passport GitHub Strategy ----------------
passport.use(
  new GitHubStrategy(
    {
      clientID: "YOUR_GITHUB_CLIENT_ID",
      clientSecret: "YOUR_GITHUB_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      let user = users.find((u) => u.id === profile.id && u.provider === "github");
      if (!user) {
        user = {
          id: profile.id,
          username: profile.username,
          provider: "github",
        };
        users.push(user);
      }
      return done(null, user);
    }
  )
);

// ---------------- Passport Serialize/Deserialize ----------------
passport.serializeUser((user, done) => {
  done(null, { id: user.id, provider: user.provider });
});

passport.deserializeUser((obj, done) => {
  const user = users.find((u) => u.id === obj.id && u.provider === obj.provider);
  done(null, user);
});

// ---------------- Middleware ----------------
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send("Unauthorized");
}

// ---------------- Routes ----------------

// Local Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username && u.provider === "local")) {
    return res.status(400).send("Username already taken");
  }
  users.push({ id: users.length + 1, username, password, provider: "local" });
  res.send("User registered successfully");
});

// Local Login
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(`Welcome ${req.user.username} (local)`);
});

// GitHub Login (redirects to GitHub)
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub Callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.send(`Welcome ${req.user.username} (GitHub)`);
  }
);

// Protected Profile
app.get("/profile", ensureAuth, (req, res) => {
  res.send(`Hello ${req.user.username}, logged in via ${req.user.provider}`);
});

// Logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Logout error");
    res.send("Logged out");
  });
});

// ---------------- Start Server ----------------
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
