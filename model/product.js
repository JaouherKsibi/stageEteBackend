const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  nom: { type: String, required: true },
  price: { type: Number, required: true },
  category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
  imageUrl: { type: String, required: true },
  description: { type: String, required: true }
});
module.exports = mongoose.model('Product', productSchema);