const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getDashboardStats } = require('../controllers/reportController');

const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);

module.exports = router;