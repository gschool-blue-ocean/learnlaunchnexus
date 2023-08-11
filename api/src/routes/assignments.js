/*GET /assignments : List all assignments.
GET /assignments/:id : Retrieve a specific assignment.
POST /assignments : Create a new assignment.
PUT /assignments/:id : Update an assignment.
DELETE /assignments/:id : Delete an assignment.*/

import express from 'express'
const router = express.Router();

// Get all assignments
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM assignment");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get a specific assignment
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM assignment WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Assignment not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Create a new assignment
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query("INSERT INTO assignment (name) VALUES ($1) RETURNING *", [name]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update an assignment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await pool.query("UPDATE assignment SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Assignment not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM assignment WHERE id = $1", [id]);
        res.json({ message: "Assignment deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;
