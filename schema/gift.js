const mongoose = require('mongoose');

const Gift = mongoose.Schema({
    imgUrl:String,
    title:String,
    model:String,
    category:String,
    price:String,
    prevPrice:String
})
module.exports = mongoose.model('gift', Gift);