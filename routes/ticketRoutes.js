// import express from 'express';
// import { protect, isAdmin } from '../middleware/authMiddleware.js';
// import {
//   createTicket,
//   getTickets,
//   getTicketById,
//   updateTicket,
//   deleteTicket,
//   getAllTickets,
//   assignTicket,
//   resolveTicket,
//   getTicketNotes,
//   createTicketNote,
// } from '../controllers/ticketController.js';

// const router = express.Router()


const express = require('express');
const router = express.Router();
const { createTicket, getMyTickets, getTicketById, addComment } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createTicket);
router.get('/me', protect, getMyTickets);
router.get('/:id', protect, getTicketById);
router.post('/:id/comments', protect, addComment);

module.exports = router;
