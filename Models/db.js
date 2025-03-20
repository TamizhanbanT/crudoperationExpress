const express = require('express');
const mysql = require('mysql2'); // MySQL database connection

// MySQL connection setup
let db;

try {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Hornet@sql#123',
        database: 'ta_maths'
    });

    db.connect((err) => {
        if (err) {
            console.error('Database connection failed:', err);
            return;
        }
        console.log('Connected to MySQL Database');
    });
} catch (error) {
    console.error('Unexpected error during database connection:', error);
}

module.exports = db;
