const mongoose = require('mongoose');

const Gift = mongoose.Schema({
    imgUrl:String,
    title:String,
    model:String,
    category:Array,
    price:String,
    prevPrice:String,
    productDesc:String,
    vendorId:String,
})
module.exports = mongoose.model('gift', Gift);