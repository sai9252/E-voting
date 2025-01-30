import express from 'express';
import mysql from 'mysql2/promise'; // Use mysql2/promise for async/await support
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '0000', // Replace with your MySQL password
    database: 'e_voting',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Register Endpoint
app.post('/register', async (req, res) => {
    const { name, email, aadhar, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (name, email, aadhar, password) VALUES (?, ?, ?, ?)';
        await db.query(query, [name, email, aadhar, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { aadhar, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE aadhar = ?';
        const [results] = await db.query(query, [aadhar]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid Aadhar or password' });
        }

        const user = results[0];

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Aadhar or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});