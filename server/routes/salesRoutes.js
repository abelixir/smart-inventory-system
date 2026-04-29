const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createSale, getSales } = require('../controllers/salesController');

const router = express.Router();

router.post('/', protect, createSale);
router.get('/', protect, getSales);

module.exports = router;