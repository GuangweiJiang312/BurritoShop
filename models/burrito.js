const mongoose = require('mongoose');

const burritoSchema = new mongoose.Schema({
  name: String,
  size: String,
  price: Number,
  options: [String] // Bonus: Handling burrito options
});

module.exports = mongoose.model('Burrito', burritoSchema);