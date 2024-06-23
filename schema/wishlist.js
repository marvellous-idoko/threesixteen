const mongoose = require('mongoose');

const Wishlist = mongoose.Schema({
    gifts:[],
    dateOrdered: {
        type: Date,
        default: new Date(),
      },
    userId:String,
    wishlistName:String,
    address:String,
    isPaid:[],
    dateToBeDelivered:Date
})
module.exports = mongoose.model('wishlist', Wishlist);