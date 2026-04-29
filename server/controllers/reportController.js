const Sale = require('../models/Sale');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

const getDashboardStats = asyncHandler(async (req, res) => {
  const totalSales = await Sale.aggregate([{ $group: { _id: null, total: { $sum: '$finalAmount' } } }]);
  const todaySales = await Sale.aggregate([
    { $match: { date: { $gte: new Date(new Date().setHours(0,0,0,0)) } } },
    { $group: { _id: null, total: { $sum: '$finalAmount' } } }
  ]);

  const lowStock = await Product.countDocuments({ quantityInStock: { $lte: '$reorderLevel' } });

  res.json({
    totalRevenue: totalSales[0]?.total || 0,
    todaySales: todaySales[0]?.total || 0,
    lowStockCount: lowStock,
    totalProducts: await Product.countDocuments()
  });
});

module.exports = { getDashboardStats };