const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  totalCost: Number
});

module.exports = mongoose.model('Order', orderSchema);
