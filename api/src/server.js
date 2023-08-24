import express from 'express'
const app = express();
import cors from 'cors'
import pool from '../db.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const PORT = process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("dist")); 

//Routes
import adminRoutes from './routes/admin.js'
import assignmentRoutes from './routes/assignments.js'
import cohortAssignmentRoutes from './routes/cohort_assignment.js'
import cohortRoutes from './routes/cohort.js'
import studentRoutes from './routes/students.js'
import submissionRoutes from './routes/submission.js'
import trackingRoutes from './routes/tracking.js'
import userRoutes from './routes/users.js'
import toDoRoutes from './routes/todos.js'

import authRoutes from '../auth/auth.js'
// create API routes
app.use('/admins', adminRoutes);
app.use('/assignment', assignmentRoutes);
app.use('/cohort_assignment', cohortAssignmentRoutes);
app.use('/cohort', cohortRoutes);
app.use('/students', studentRoutes);
app.use('/submission', submissionRoutes)
app.use('/tracking', trackingRoutes)
app.use('/users', userRoutes);
app.use('/todos', toDoRoutes);
app.use('/authentication', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});
// simple testing route
app.get('/test', async (req, res) => {
  try {
      const results = await pool.query("SELECT * FROM users");
      res.json(results.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
  }
});

// if a route does not match from the above return the user to the indes.html for reacts client side routing
app.get('/*', function(req,res) {
  try {
    console.log(__filename);
    console.log(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    // res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
  } catch (error) {
    res.json(error.message)
  }
		
 });

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

export default server; // Export for testing