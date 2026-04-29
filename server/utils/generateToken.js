const jwt = require('jsonwebtoken');

const generateToken = (id, role, name) => {
  return jwt.sign(
    { id, role, name },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
};

module.exports = generateToken;