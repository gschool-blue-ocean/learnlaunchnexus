/*GET /submissions : List all submissions.
GET /submissions/:id : Retrieve a specific submission.
POST /submissions : Create a new submission.
PUT /submissions/:id : Update a submission.
DELETE /submissions/:id : Delete a submission.*/


import express from 'express'
import pool from "../../db.js";
const router = express.Router();

// Get all submissions
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM submission");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

// Get a specific submission by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM submission WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Submission not found." });
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

// Get a specific submission by ID
router.get('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("select user_id, assignment_id, name, submission_time,  status, feedback from (SELECT * FROM submission INNER JOIN assignment ON submission.assignment_id=assignment.id INNER JOIN tracking ON submission.tracking_id=tracking.id INNER JOIN student ON submission.student_id=student.id INNER JOIN users ON student.id=users.id WHERE users.id=$1) as submission_join", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Submission not found." });
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

router.get('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM submission WHERE student_id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Submission not found." });
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



// Create a new submission
router.post('/', async (req, res) => {
    const { info, student_id, assignment_id, tracking_id } = req.body;
    try {
        const result = await pool.query("INSERT INTO submission (info, submission_time, student_id, assignment_id, tracking_id) VALUES ($1, NOW(), $2, $3, $4) RETURNING *",
            [info, student_id, assignment_id, tracking_id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

// Update a submission by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { info, student_id, assignment_id, tracking_id } = req.body;
    try {
        const result = await pool.query("UPDATE submission SET info = $1, student_id = $2, assignment_id = $3, tracking_id = $4 WHERE id = $5 RETURNING *",
            [info, student_id, assignment_id, tracking_id, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Submission not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

// Delete a submission by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM submission WHERE id = $1", [id]);
        res.json({ message: "Submission deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

export default router;
