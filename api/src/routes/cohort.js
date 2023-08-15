/*
GET /cohorts : List all cohorts.
GET /cohorts/:id : Retrieve a specific cohort.
POST /cohorts : Create a new cohort.
PUT /cohorts/:id : Update a cohort.
DELETE /cohorts/:id : Delete a cohort.
*/

import express from 'express'
import pool from "../../db.js";
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM cohort");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

// Get a specific cohort
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM cohort WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Cohort not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

// Create a new cohort
router.post('/', async (req, res) => {
    const { start_date, end_date, name } = req.body;
    try {
        const result = await pool.query("INSERT INTO cohort (start_date, end_date, name) VALUES ($1, $2, $3) RETURNING *", 
                                        [start_date, end_date, name]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

// Update a cohort
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { start_date, end_date, name } = req.body;
    try {
        const result = await pool.query("UPDATE cohort SET start_date = $1, end_date = $2, name = $3 WHERE id = $4 RETURNING *", 
                                        [start_date, end_date, name, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Cohort not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

// Delete a cohort
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM cohort WHERE id = $1", [id]);
        res.json({ message: "Cohort deleted successfully." });
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

export default router;
