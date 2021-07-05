const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, ref: 'Product', required: true },
  qty: { type: Number, default: 1 },
  price: { type: Number, ref: 'Product', required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
