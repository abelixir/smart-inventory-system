const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      token: generateToken(user._id, user.role, user.name),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

module.exports = { login };