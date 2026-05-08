// const Ticket = require('../models/ticketModel');
// const User = require('../models/userModel');

// //  Show ALL valid tickets 
// exports.getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find({ createdBy: { $ne: null } })
//       .populate('createdBy', 'name email')
//       .populate('assignedTo', 'name email')
//       .sort('-createdAt');

//     res.json(tickets);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // exports.assignTicket = async (req, res) => {
// //   try {
// //     const { ticketId, userId } = req.body;

// //     const ticket = await Ticket.findById(ticketId);
// //     if (!ticket)
// //       return res.status(404).json({ message: 'Ticket not found' });

// //     ticket.assignedTo = userId;
// //     await ticket.save();

// //     res.json(ticket);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };



// exports.assignTicket = async (req, res) => {
//   try {
//     const { ticketId, userId } = req.body;

//     const updatedTicket = await Ticket.findByIdAndUpdate(
//       ticketId,
//       { assignedTo: userId },
//       { new: true }
//     )
//       .populate("createdBy", "name email")
//       .populate("assignedTo", "name email");

//     if (!updatedTicket)
//       return res.status(404).json({ message: "Ticket not found" });

//     res.json(updatedTicket);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.stats = async (req, res) => {
//   try {
//     const total = await Ticket.countDocuments({ createdBy: { $ne: null } });
//     const pending = await Ticket.countDocuments({ createdBy: { $ne: null }, status: 'Pending' });
//     const inProgress = await Ticket.countDocuments({ createdBy: { $ne: null }, status: 'In Progress' });
//     const resolved = await Ticket.countDocuments({ createdBy: { $ne: null }, status: 'Resolved' });

//     res.json({ total, pending, inProgress, resolved });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

//  Get ALL tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: { $ne: null } })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort('-createdAt');

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Assign ticket
exports.assignTicket = async (req, res) => {
  try {
    const { ticketId, userId } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { assignedTo: userId },
      { new: true }
    )
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!updatedTicket)
      return res.status(404).json({ message: "Ticket not found" });

    res.json(updatedTicket);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Update ticket status 
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!updatedTicket)
      return res.status(404).json({ message: "Ticket not found" });

    res.json(updatedTicket);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Stats
exports.stats = async (req, res) => {
  try {
    const total = await Ticket.countDocuments({ createdBy: { $ne: null } });
    const pending = await Ticket.countDocuments({ createdBy: { $ne: null }, status: 'Pending' });
    const inProgress = await Ticket.countDocuments({ createdBy: { $ne: null }, status: 'In Progress' });
    const resolved = await Ticket.countDocuments({ createdBy: { $ne: null }, status: 'Resolved' });

    res.json({ total, pending, inProgress, resolved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






