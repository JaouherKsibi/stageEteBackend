const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
 date:{type: String, required:true},
 quantity:{type:Number, required: true},
 seen:{type:Boolean, required: true},
 product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
 client:{type:mongoose.Schema.Types.ObjectId,ref:'Client',required: true},
}
    
);

module.exports = mongoose.model('Order', orderSchema);