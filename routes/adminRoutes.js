const express = require('express');
const router = express.Router();
const { getAllTickets, assignTicket, updateStatus, stats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/tickets', protect, admin, getAllTickets);
router.post('/assign', protect, admin, assignTicket);
router.put('/tickets/:id/status', protect, admin, updateStatus);
router.get('/stats', protect, admin, stats);

module.exports = router;



