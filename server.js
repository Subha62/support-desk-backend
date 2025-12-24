// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import ticketRoutes from './routes/ticketRoutes.js';



// dotenv.config();         

// connectDB();             

// const app = express();


// app.use(express.json());


// app.use('/api/users', userRoutes);
// app.use('/api/tickets',ticketRoutes);


// app.get('/', (req, res) => {
//   res.send('API is running...');
// });


// app.use((req, res) => {
//   res.status(404).json({ message: '❌ API route not found' });
// });


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
 


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
