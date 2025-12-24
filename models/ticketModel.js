// import mongoose from 'mongoose';

// const ticketSchema = new mongoose.Schema(
//   {
//     // The user who created the ticket
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },

//     // Ticket category (e.g., IT, HR, Facilities)
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // The actual product or asset related to the ticket (e.g., Laptop, Printer)
//     product: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // Priority level
//     priority: {
//       type: String,
//       enum: ['Low', 'Medium', 'High'],
//       default: 'Low',
//     },

//     // Description of the issue
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // Status of the ticket
//     status: {
//       type: String,
//       enum: ['Open', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
//       default: 'Open',
//     },

//     // Admin or staff the ticket is assigned to
//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       default: null,
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt
//   }
// );

// const Ticket = mongoose.model('Ticket', ticketSchema);

// export default Ticket;



const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  status: { type: String, enum: ['Pending','In Progress','Resolved'], default: 'Pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);

