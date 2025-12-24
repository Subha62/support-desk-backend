const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ message: 'User already exists' });

    user = await User.create({ name, email, password });
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    });
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user && await user.matchPassword(password)) {
      return res.json({
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      });
    }
    res.status(401).json({ message: 'Invalid credentials' });
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.me = async (req, res) => {
  res.json(req.user);
};
