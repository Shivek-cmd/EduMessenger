const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
exports.registerUser = async (req, res) => {
  const { name, email, phone, role, password } = req.body;

  try {
    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    if (user) {
      res.header("auth-token", generateToken(user._id)).json({
        message: "Registerd Successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.header("auth-token", generateToken(user._id)).json({
        message: "Logged in Successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
