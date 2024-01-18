const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  burrito: { type: mongoose.Schema.Types.ObjectId, ref: 'Burrito' },
  quantity: Number
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
