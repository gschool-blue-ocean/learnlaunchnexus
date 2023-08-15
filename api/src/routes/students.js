import express from 'express'
import pool from "../../db.js";
const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM student");
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// Get a specific student by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Student not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



// Add a new student
router.post('/', async (req, res) => {
    const { cohort_id, user_id, desired_location, location } = req.body;
    try {
        const result = await pool.query("INSERT INTO student (cohort_id, user_id, desired_location, location) VALUES ($1, $2, $3, $4) RETURNING *",
            [cohort_id, user_id, desired_location, location]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update a student's details by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cohort_id, user_id, desired_location, location } = req.body;
    try {
        const result = await pool.query("UPDATE student SET cohort_id = $1, user_id = $2, desired_location = $3, location = $4 WHERE id = $5 RETURNING *",
            [cohort_id, user_id, desired_location, location, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Student not found." });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.put('/location/:id', async (req, res) => {
    const { id } = req.params;
    const { location } = req.body;
    try {
        const result = await pool.query("UPDATE student SET location = $1 WHERE id = $2 RETURNING *", 
            [location, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found." });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.put('/desired-location/:id', async (req, res) => {
    const { id } = req.params;
    const { desired_location } = req.body;
    try {
        const result = await pool.query("UPDATE student SET desired_location = $1 WHERE id = $2 RETURNING *", 
            [desired_location, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found." });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM student WHERE id = $1", [id]);
        res.json({ message: "Student deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


export default router;
