const express = require('express');
const cors = require('cors');
 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
 
const studentRoutes = require('./routes/students');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

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

module.exports = server; // Export for testing
