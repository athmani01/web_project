const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');  // Added to correctly handle paths
const app = express();
const port = 5000;

// Middleware for body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public/css')));  // Corrected path

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Use path.join for paths

// Database setup
const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Failed to connect to the database:", err.message);
        process.exit(1);  // Exit if the database connection fails
    }
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error("Failed to create table:", err.message);
        } else {
            console.log('Table created or already exists.');
        }
    });
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {title: "Home"});
});

app.get('/areas', (req, res) => {
    res.render('areas', {title: "Areas"});
});

app.get('/rides', (req, res) => {
    res.render('rides', {title: "Rides"});
});

app.get('/faq', (req, res) => {
    res.render('faq', {title: "FAQ"});
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: "Contact"});
});

app.get('/minigame', (req, res) => {
    res.render('minigame', {title: "Mini-Game"});
});
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const sql = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, message], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Failed to save message, please try again!");
            return;
        }
        console.log(`A message has been added with rowid ${this.lastID}`);
    });
});

// Start server
app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
});
