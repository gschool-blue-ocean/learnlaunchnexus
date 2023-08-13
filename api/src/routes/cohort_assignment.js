/*cohort_assignment:

GET /cohort_assignments : List all cohort assignments.
POST /cohort_assignments : Assign an assignment to a cohort.
DELETE /cohort_assignments/:id : Remove an assignment from a cohort.*/

import express from 'express'
import pool from "../../db.js";
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM cohort_assignment");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get specific cohort-assignment mapping by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM cohort_assignment WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Cohort-Assignment mapping not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Assign an assignment to a cohort
router.post('/', async (req, res) => {
    const { assignment_id, cohort_id } = req.body;
    try {
        const result = await pool.query("INSERT INTO cohort_assignment (assignment_id, cohort_id) VALUES ($1, $2) RETURNING *",
                                        [assignment_id, cohort_id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete a cohort-assignment mapping by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM cohort_assignment WHERE id = $1", [id]);
        res.json({ message: "Cohort-Assignment mapping deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;
