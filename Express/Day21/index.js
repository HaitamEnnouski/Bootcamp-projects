// app.js - simple beginner-friendly secure fixes
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const escape = require('escape-html');
const helmet = require('helmet');

const app = express();

/* Simple security headers */
app.use(helmet());

/* Parsers */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* Session - small improvements over defaults */
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-secret';
app.use(session({
  name: 'sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,                     // JS in browser can't read the cookie
    sameSite: 'lax',                    // helps against CSRF
    secure: process.env.NODE_ENV === 'production', // true only on HTTPS in prod
    maxAge: 1000 * 60 * 30              // 30 minutes
  }
}));

/* CSRF protection (stores token in session) */
const csrfProtection = csrf();
app.use(csrfProtection); // apply globally so all POSTs are protected

/* Routes */
app.get('/', (req, res) => {
  res.send('Welcome to the Sample Node.js Application (simple secure fixes)');
});

app.get('/login', (req, res) => {
  // include CSRF token in the form as a hidden field
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST" autocomplete="off">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  // Basic input validation (beginner-friendly)
  const username = (req.body.username || '').toString().trim();
  const password = (req.body.password || '').toString();

  if (username.length < 3) {
    return res.status(400).send('Username too short (min 3 chars).');
  }
  if (password.length < 6) {
    return res.status(400).send('Password too short (min 6 chars).');
  }

  // Demo authentication (same logic as original for challenge)
  if (username === 'admin' && password === 'password') {
    // set session values
    req.session.authenticated = true;
    req.session.username = username;
    return res.redirect('/profile');
  } else {
    return res.status(401).send('Invalid username or password');
  }
});

app.get('/profile', (req, res) => {
  if (req.session && req.session.authenticated) {
    // escape output to prevent XSS
    const safeName = escape(req.session.username || 'user');
    res.send(`<h1>Welcome to your profile, ${safeName}</h1>`);
  } else {
    res.redirect('/login');
  }
});

/* CSRF error handler (simple) */
app.use((err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    // CSRF token missing or invalid
    return res.status(403).send('Form tampered with (invalid CSRF token).');
  }
  next(err);
});

/* Generic error handler (small) */
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).send('Server error');
});

/* Start server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
