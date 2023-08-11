import express from 'express'
import pool from "../../db.js";
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM users");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "User not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// READ: Get a single user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

// Update a user's details by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { auth_id, first_name, last_name, isAdmin } = req.body;
    try {
        const result = await pool.query("UPDATE users SET auth_id = $1, first_name = $2, last_name = $3, isAdmin = $4 WHERE id = $5 RETURNING *",
            [auth_id, first_name, last_name, isAdmin, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "User not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json({ message: "User deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


export default router;
