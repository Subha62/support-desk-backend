const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect middleware
exports.protect = async (req, res, next) => {
  let token =
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;

  if (!token)
    return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Admin middleware (FIXED)
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  return res.status(403).json({ message: 'Admin only' });
};



