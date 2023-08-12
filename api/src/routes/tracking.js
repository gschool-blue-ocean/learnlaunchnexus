/*GET /trackings : List all statuses.
POST /trackings : Create a new status.
PUT /trackings/:id : Update a status.
DELETE /trackings/:id : Delete a status.*/

import express from 'express'
import pool from "../../db.js";

const router = express.Router();


// Get all tracking statuses
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM tracking");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get a specific tracking status by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM tracking WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Tracking status not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Create a new tracking status
router.post('/', async (req, res) => {
    const { status } = req.body;
    try {
        const result = await pool.query("INSERT INTO tracking (status) VALUES ($1) RETURNING *", [status]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update a tracking status by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await pool.query("UPDATE tracking SET status = $1 WHERE id = $2 RETURNING *", [status, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Tracking status not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete a tracking status by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM tracking WHERE id = $1", [id]);
        res.json({ message: "Tracking status deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


export default router;
