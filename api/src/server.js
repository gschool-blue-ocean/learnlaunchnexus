import express from 'express'
import cors from 'cors'
import * as dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

//new pool instance

const dbString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: dbString,
});



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
 
import studentRoutes from './routes/students.js'
import userRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'

 app.use('/students', studentRoutes);
 app.use('/users', userRoutes);
 app.use('/admins', adminRoutes);


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