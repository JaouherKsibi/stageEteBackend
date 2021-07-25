const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
  nom: { type: String, required: true },
  imageUrl: { type: String, required: true }
});
module.exports = mongoose.model('Category', categorySchema);