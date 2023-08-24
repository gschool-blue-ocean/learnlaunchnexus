import express from 'express'
import pool from "../../db.js";
const router = express.Router();

 // routes based off the administrator table

// Get all admins
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM admin");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
       res.status(500).json(err.message);
    }
});

// Get a specific admin by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM admin WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Admin not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
       res.status(500).json(err.message);
    }
});


// Add a new admin
router.post('/', async (req, res) => {
    const { user_id } = req.body;
    try {
        const result = await pool.query("INSERT INTO admin (user_id) VALUES ($1) RETURNING *", [user_id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
       res.status(500).json(err.message);
    }
});

//Makes someone an admin
router.patch('/add/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const result = await pool.query("UPDATE Users set isAdmin = true WHERE auth_id = (SELECT user_id from Authentication where user_email = $1) returning *; ", [email]);
        if (result.rows.length === 0) return res.status(404).json({ message: "User not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

//Makes someone not an admin
router.patch('/delete/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const result = await pool.query("UPDATE Users set isAdmin = false WHERE auth_id = (SELECT user_id from Authentication where user_email = $1) returning *; ", [email]);
        if (result.rows.length === 0) return res.status(404).json({ message: "User not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

// Update an admin's details by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const result = await pool.query("UPDATE admin SET user_id = $1 WHERE id = $2 RETURNING *", [user_id, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Admin not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
       res.status(500).json(err.message);
    }
});

// Delete an admin by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM admin WHERE id = $1", [id]);
        res.json({ message: "Admin removed successfully." });
    } catch (err) {
        console.error(err.message);
       res.status(500).json(err.message);
    }
});



export default router;
