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


// const express = require('express');
// const router = express.Router();
// const { createTicket, getMyTickets, getTicketById, addComment } = require('../controllers/ticketController');
// const { protect } = require('../middleware/authMiddleware');

// router.post('/', protect, createTicket);
// router.get('/me', protect, getMyTickets);
// router.get('/:id', protect, getTicketById);
// router.post('/:id/comments', protect, addComment);

// module.exports = router;



const express = require("express");

const router = express.Router();

const {
  createTicket,
  getMyTickets,
  getTicketById,
  addComment,
  assignTicket,
  getAssignedTickets,
  updateTicketStatus,
  getAllTickets,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");


// Create Ticket
router.post("/", protect, createTicket);


// User's Own Tickets
router.get("/me", protect, getMyTickets);


// Admin Get All Tickets
router.get("/all", protect, getAllTickets);


// Technician Assigned Tickets
router.get("/assigned/me", protect, getAssignedTickets);


// Get Ticket By ID
router.get("/:id", protect, getTicketById);


// Add Comment
router.post("/:id/comments", protect, addComment);


// Admin Assign Ticket To Technician
router.put("/:id/assign", protect, assignTicket);


// Technician Update Ticket Status
router.put("/:id/status", protect, updateTicketStatus);


module.exports = router;