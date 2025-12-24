const Ticket = require('../models/ticketModel');

exports.createTicket = async (req, res) => {
  const { title, description, priority, category } = req.body;
  try {
    const ticket = await Ticket.create({
      title, description, priority, category, createdBy: req.user._id
    });
    res.status(201).json(ticket);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id }).sort('-createdAt');
    res.json(tickets);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('createdBy', 'name email').populate('assignedTo','name email');
    if(!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) return res.status(404).json({ message: 'Ticket not found' });
    ticket.comments.push({ user: req.user._id, name: req.user.name, text: req.body.text });
    await ticket.save();
    res.json(ticket);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
