import express from 'express'
import pool from "../../db.js";
const router = express.Router();
// routes based off the user table
// Get all users
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM users");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});

// returns all users that do not have a cohort and are not admins
router.get('/unassigned', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM users WHERE isadmin = false AND NOT EXISTS (SELECT 1 FROM student WHERE users.id = student.user_id)");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
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
         res.status(500).json(err.message);
    }
});
// returns the user information based off the authentication email that is given
router.get('/init/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const result = await pool.query("SELECT * from Users WHERE auth_id = (SELECT user_id from Authentication where user_email = $1); ", [email]);
        if (result.rows.length === 0) return res.status(404).json({ message: "User not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});
// updates the email
router.put('/update-email/:email', async (req, res) => {
    const currentEmail = req.params.email;
    const newEmail = req.body.email;
    
    try {
        // Check if the new email already exists in the database
        const emailExists = await pool.query('SELECT * FROM authentication WHERE user_email = $1', [newEmail]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use.' });
        }
        
        // Update the user's email
        const result = await pool.query(
            "UPDATE authentication SET user_email = $1 WHERE user_id = (SELECT user_id FROM authentication WHERE user_email = $2)", 
            [newEmail, currentEmail]
        );
        
        // Check if the update was successful
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // Send a success response
        res.status(200).json({ message: 'Email updated successfully.' });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});



// Add a new user
router.post('/', async (req, res) => {
    const {  first_name, last_name,email } = req.body;
    try {
      
        const result = await pool.query(`INSERT INTO users (first_name, last_name,auth_id, isAdmin) VALUES ($1, $2,(SELECT user_id FROM authentication WHERE user_email = '${email}') , false) RETURNING *`,
            [first_name, last_name]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
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
         res.status(500).json(err.message);
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
         res.status(500).json(err.message);
    }
});


export default router;
