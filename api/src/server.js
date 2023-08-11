import express from 'express'
const app = express();
import cors from 'cors'


const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("../../client/src/dist"));

//Routes
import adminRoutes from './routes/admin.js'
import assignmentRoutes from './routes/assignments.js'
import cohortAssignmentRoutes from './routes/cohort_assignment.js'
import cohortRoutes from './routes/cohort.js'
import studentRoutes from './routes/students.js'
import submissionRoutes from './routes/submission.js'
import trackingRoutes from './routes/tracking.js'
import userRoutes from './routes/users.js'

import authRoutes from '../auth/auth.js'

app.use('/admins', adminRoutes);
app.use('/assignment', assignmentRoutes);
app.use('/cohort_assignment', cohortAssignmentRoutes);
app.use('/cohort', cohortRoutes);
app.use('/students', studentRoutes);
app.use('/submission', submissionRoutes)
app.use('/tracking', trackingRoutes)
app.use('/users', userRoutes);

app.use('/authentication', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

export default server; // Export for testing