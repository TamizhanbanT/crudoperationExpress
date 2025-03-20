// routes/mentors.js

const express = require('express');
const router = express.Router();
const db = require('../Models/db');

// CRUD routes for mentors

// Get all mentors
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM mentors';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving mentors:', err);
                return res.status(500).json({ message: 'Failed to retrieve mentors' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Get a mentor by ID
router.get('/:mentorId', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const query = 'SELECT * FROM mentors WHERE mentorId = ?';
        db.query(query, [mentorId], (err, result) => {
            if (err) {
                console.error('Error retrieving mentor:', err);
                return res.status(500).json({ message: 'Failed to retrieve mentor' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Mentor not found' });
            }
            res.json(result[0]);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Add a new mentor
router.post('/', async (req, res) => {
    try {
        const { mentorId, mentorName, mentorPhone } = req.body;
        if (!mentorId || !mentorName || !mentorPhone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const query = 'INSERT INTO mentors (mentorId, mentorName, mentorPhone) VALUES (?, ?, ?)';
        db.query(query, [mentorId, mentorName, mentorPhone], (err, result) => {
            if (err) {
                console.error('Error adding mentor:', err);
                return res.status(500).json({ message: 'Failed to add mentor' });
            }
            res.status(201).json({ message: 'Mentor added successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Update a mentor
router.put('/:mentorId', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { mentorName, mentorPhone } = req.body;
        let query = 'UPDATE mentors SET ';
        const updates = [];
        const values = [];

        if (mentorName) {
            updates.push('mentorName = ?');
            values.push(mentorName);
        }
        if (mentorPhone) {
            updates.push('mentorPhone = ?');
            values.push(mentorPhone);
        }

        query += updates.join(', ') + ' WHERE mentorId = ?';
        values.push(mentorId);

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error updating mentor:', err);
                return res.status(500).json({ message: 'Failed to update mentor' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Mentor not found' });
            }
            res.json({ message: 'Mentor updated successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// Delete a mentor
router.delete('/:mentorId', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const query = 'DELETE FROM mentors WHERE mentorId = ?';
        db.query(query, [mentorId], (err, result) => {
            if (err) {
                console.error('Error deleting mentor:', err);
                return res.status(500).json({ message: 'Failed to delete mentor' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Mentor not found' });
            }
            res.json({ message: 'Mentor deleted successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

module.exports = router;
