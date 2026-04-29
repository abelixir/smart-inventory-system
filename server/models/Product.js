const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  quantityInStock: { type: Number, required: true, default: 0 },
  reorderLevel: { type: Number, default: 10 },
  expiryDate: { type: Date },
  barcode: { type: String, unique: true, sparse: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);