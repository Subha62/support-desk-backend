// const Ticket = require('../models/ticketModel');

// exports.createTicket = async (req, res) => {
//   const { title, description, priority, category } = req.body;
//   try {
//     const ticket = await Ticket.create({
//       title, description, priority, category, createdBy: req.user._id
//     });
//     res.status(201).json(ticket);
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// exports.getMyTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find({ createdBy: req.user._id }).sort('-createdAt');
//     res.json(tickets);
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// exports.getTicketById = async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id).populate('createdBy', 'name email').populate('assignedTo','name email');
//     if(!ticket) return res.status(404).json({ message: 'Ticket not found' });
//     res.json(ticket);
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// exports.addComment = async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if(!ticket) return res.status(404).json({ message: 'Ticket not found' });
//     ticket.comments.push({ user: req.user._id, name: req.user.name, text: req.body.text });
//     await ticket.save();
//     res.json(ticket);
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };





const Ticket = require("../models/ticketModel");


// Create Ticket
exports.createTicket = async (req, res) => {
  const { title, description, priority, category } = req.body;

  try {

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json(ticket);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// User's Own Tickets
exports.getMyTickets = async (req, res) => {

  try {

    const tickets = await Ticket.find({
      createdBy: req.user._id,
    })
      .populate("assignedTo", "name email role")
      .sort("-createdAt");

    res.json(tickets);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// Get Ticket By ID
exports.getTicketById = async (req, res) => {

  try {

    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json(ticket);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// Add Comment
exports.addComment = async (req, res) => {

  try {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.comments.push({
      user: req.user._id,
      name: req.user.name,
      text: req.body.text,
    });

    await ticket.save();

    res.json(ticket);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// Admin Assign Ticket To Technician
exports.assignTicket = async (req, res) => {

  try {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.assignedTo = req.body.technicianId;
    ticket.status = "Assigned";

    await ticket.save();

    res.json({
      message: "Ticket assigned successfully",
      ticket,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// Technician View Assigned Tickets
exports.getAssignedTickets = async (req, res) => {

  try {

    const tickets = await Ticket.find({
      assignedTo: req.user._id,
    })
      .populate("createdBy", "name email")
      .sort("-createdAt");

    res.json(tickets);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// Technician Update Ticket Status
exports.updateTicketStatus = async (req, res) => {

  try {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.status = req.body.status;

    await ticket.save();

    res.json({
      message: "Ticket status updated",
      ticket,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Admin Get All Tickets
exports.getAllTickets = async (req, res) => {

  try {

    const tickets = await Ticket.find()
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort("-createdAt");

    res.json(tickets);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};