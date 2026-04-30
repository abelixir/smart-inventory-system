const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    await User.create({
      username: "admin",
      password: "admin123",   // will be hashed automatically
      name: "Abiy Admin",
      role: "admin"
    });
    console.log("Admin user created successfully!");
    process.exit();
  } catch (err) {
    console.log("Admin may already exist:", err.message);
    process.exit();
  }
};

createAdmin();