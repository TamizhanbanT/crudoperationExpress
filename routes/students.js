// routes/students.js
const express = require('express');
const router = express.Router();
const db = require('../Models/db');

// CRUD routes for students

// Get all students


router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM students';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving students:', err);
                return res.status(500).json({ message: 'Failed to retrieve students' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Get a student by ID


router.get('/:studId', async (req, res) => {
    try {
        const { studId } = req.params;
        const query = 'SELECT * FROM students WHERE studId = ?';
        db.query(query, [studId], (err, result) => {
            if (err) {
                console.error('Error retrieving student:', err);
                return res.status(500).json({ message: 'Failed to retrieve student' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json(result[0]);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Add a new student
router.post('/', async (req, res) => {
    try {
        const { studId, studName, parentName, parentPhone, studClass } = req.body;

        
        if (!studId || !studName || !parentName || !parentPhone || !studClass) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const query = 'INSERT INTO students (studId, studName, parentName, parentPhone, studClass) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [studId, studName, parentName, parentPhone, studClass], (err, result) => {
            if (err) {
                console.error('Error adding student:', err);
                return res.status(500).json({ message: 'Failed to add student' });
            }
            res.status(201).json({ message: 'Student added successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Update a student

router.put('/:studId', async (req, res) => {
    try {
        const { studId } = req.params;
        const { studName, parentName, parentPhone, studClass } = req.body;

        const query = 'UPDATE students SET studName = ?, parentName = ?, parentPhone = ?, studClass = ? WHERE studId = ?';
        db.query(query, [studName, parentName, parentPhone, studClass, studId], (err, result) => {
            if (err) {
                console.error('Error updating student:', err);
                return res.status(500).json({ message: 'Failed to update student' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json({ message: 'Student updated successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Delete a student

router.delete('/:studId', async (req, res) => {
    try {
        const { studId } = req.params;
        const query = 'DELETE FROM students WHERE studId = ?';
        db.query(query, [studId], (err, result) => {
            if (err) {
                console.error('Error deleting student:', err);
                return res.status(500).json({ message: 'Failed to delete student' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json({ message: 'Student deleted successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

module.exports = router;
