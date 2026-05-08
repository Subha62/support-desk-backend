// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };



// // @desc Register user
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please add all fields" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // FIX: Add isAdmin: false here 👇
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       isAdmin: false,      // 🔥 Now stored in DB
//     });

//     res.status(201).json({
//       message: "Registration successful",
//       token: generateToken(user._id),
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,   // always false for new users
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// // @desc Login user
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         message: "Login successful",
//         token: generateToken(user._id),
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin || false,
//         },
//       });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Get logged-in user
// exports.me = async (req, res) => {
//   try {
//     res.json({
//       _id: req.user._id,
//       name: req.user.name,
//       email: req.user.email,
//       isAdmin: req.user.isAdmin,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id),

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      res.json({
        message: "Login successful",

        token: generateToken(user._id),

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get logged-in user
exports.me = async (req, res) => {
  try {

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
