const mongoose = require('mongoose');

const Order = mongoose.Schema({
    products:[],
    status:String,
    vendorId:String,
    dateOrdered:{
        type:Date,
       default: (new Date()),
    },
    generalGiftId:String,
    paymentInfo: {},
    paidBy:String,
    dateToBeDelivered:Date
})
module.exports = mongoose.model('order', Order);