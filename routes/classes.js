// routes/class.js
const express = require('express');
const router = express.Router();
const db = require('../Models/db');

// CRUD routes for classes

// GET all classes

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM classes';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving classes:', err);
                return res.status(500).json({ message: 'Failed to retrieve classes' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// GET individual class by classId


router.get('/:classId', async (req, res) => {
    try {
        const { classId } = req.params;
        const query = 'SELECT * FROM classes WHERE classId = ?';
        db.query(query, [classId], (err, result) => {
            if (err) {
                console.error('Error retrieving class:', err);
                return res.status(500).json({ message: 'Failed to retrieve class' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.json(result[0]);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// POST a new class


router.post('/', async (req, res) => {
    try {
        const { classId, className, mentorId } = req.body;
        if (!classId || !className || !mentorId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const query = 'INSERT INTO class (classId, className, mentorId) VALUES (?, ?, ?)';
        db.query(query, [classId, className, mentorId], (err, result) => {
            if (err) {
                console.error('Error adding class:', err);
                return res.status(500).json({ message: 'Failed to add class' });
            }
            res.status(201).json({ message: 'Class added successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// PUT (Update) a class


router.put('/:classId', async (req, res) => {
    try {
        const { classId } = req.params;
        const { className, mentorId } = req.body;
        if (!className || !mentorId) {
            return res.status(400).json({ message: 'Both className and mentorId are required' });
        }
        const query = 'UPDATE class SET className = ?, mentorId = ? WHERE classId = ?';
        db.query(query, [className, mentorId, classId], (err, result) => {
            if (err) {
                console.error('Error updating class:', err);
                return res.status(500).json({ message: 'Failed to update class' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.json({ message: 'Class updated successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// DELETE a class


router.delete('/:classId', async (req, res) => {
    try {
        const { classId } = req.params;
        const query = 'DELETE FROM class WHERE classId = ?';
        db.query(query, [classId], (err, result) => {
            if (err) {
                console.error('Error deleting class:', err);
                return res.status(500).json({ message: 'Failed to delete class' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.json({ message: 'Class deleted successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

module.exports = router;
