import express from 'express'
import pool from "../../db.js";
const router = express.Router();
// routes based off of the todo table
// Get all todos
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM todo");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    res.status(500).json(err.message);    }
});

// Get a specific todo by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Todo not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
res.status(500).json(err.message);
    }
});

// Get all todos associated with specific user ID
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM todo WHERE user_id = $1 ORDER BY id DESC", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "user not found." });
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
res.status(500).json(err.message);
    }
});

// Add a new todo
router.post('/', async (req, res) => {
    const { user_id, todo_item } = req.body;
    try {
        const result = await pool.query("INSERT INTO todo (user_id, todo_item) VALUES ($1, $2) RETURNING *",[user_id, todo_item]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
res.status(500).json(err.message);    }
});

// Delete a todo by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json({ message: "Todo deleted successfully." });
    } catch (err) {
        console.error(err.message);
res.status(500).json(err.message);    }
});


export default router;
