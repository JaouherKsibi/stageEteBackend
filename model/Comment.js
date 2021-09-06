const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({
    nom:{type:String,required:true},
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
    seen:{type:Boolean, required: true}
});
module.exports = mongoose.model('Comment', CommentSchema);