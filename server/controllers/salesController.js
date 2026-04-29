const Sale = require('../models/Sale');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

const createSale = asyncHandler(async (req, res) => {
  const { items, totalAmount, discount = 0, tax = 0, cashier } = req.body;

  // Update stock for each product
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      if (product.quantityInStock < item.quantity) {
        res.status(400);
        throw new Error(`Not enough stock for ${product.name}`);
      }
      product.quantityInStock -= item.quantity;
      await product.save();
    }
  }

  const saleId = `SALE-${Date.now()}`;

  const sale = new Sale({
    saleId,
    items,
    totalAmount,
    discount,
    tax,
    finalAmount: totalAmount - discount + tax,
    cashier
  });

  const createdSale = await sale.save();
  res.status(201).json(createdSale);
});

const getSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find({}).sort({ date: -1 }).populate('items.product', 'name');
  res.json(sales);
});

module.exports = { createSale, getSales };