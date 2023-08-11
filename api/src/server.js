import express from 'express'
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 3007;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("../client/src/dist")); 


import studentRoutes from './routes/students.js'
import userRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import authRoutes from '../auth/auth.js'

 app.use('/students', studentRoutes);
 app.use('/users', userRoutes);
 app.use('/admins', adminRoutes);
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

export default server ; // Export for testing