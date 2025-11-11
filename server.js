const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'job_application_db'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        console.log('\n⚠️  Please make sure:');
        console.log('1. MySQL is running');
        console.log('2. Database credentials in .env file are correct');
        console.log('3. Database "job_application_db" exists (run database.sql first)\n');
        process.exit(1);
    }
    console.log('✅ Connected to MySQL database');
});

// API Routes

// Submit job application
app.post('/api/applications', (req, res) => {
    const { fullName, email, phone, position, experience, education, coverLetter, resume } = req.body;

    // Validation
    if (!fullName || !email || !phone || !position || !experience || !education || !coverLetter) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const query = `
        INSERT INTO applications 
        (full_name, email, phone, position, experience, education, cover_letter, resume, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;

    db.query(
        query,
        [fullName, email, phone, position, experience, education, coverLetter, resume || null],
        (err, result) => {
            if (err) {
                console.error('Error inserting application:', err);
                return res.status(500).json({ error: 'Failed to submit application' });
            }
            res.status(201).json({
                message: 'Application submitted successfully',
                applicationId: result.insertId
            });
        }
    );
});

// Get all applications
app.get('/api/applications', (req, res) => {
    const query = 'SELECT * FROM applications ORDER BY created_at DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching applications:', err);
            return res.status(500).json({ error: 'Failed to fetch applications' });
        }
        res.json(results);
    });
});

// Get single application by ID
app.get('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM applications WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching application:', err);
            return res.status(500).json({ error: 'Failed to fetch application' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json(results[0]);
    });
});

// Update application status
app.patch('/api/applications/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    const query = 'UPDATE applications SET status = ? WHERE id = ?';
    
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            return res.status(500).json({ error: 'Failed to update status' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json({ message: 'Status updated successfully' });
    });
});

// Delete application
app.delete('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM applications WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting application:', err);
            return res.status(500).json({ error: 'Failed to delete application' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json({ message: 'Application deleted successfully' });
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Access the application form at http://localhost:${PORT}/index.html\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    db.end();
    process.exit(0);
});
