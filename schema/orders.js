const mongoose = require('mongoose');

const Order = mongoose.Schema({
    products:[],
    status:{
        type:String,
        enum:'pending' | 'transit' | 'delivered' | 'completed',
    },
    vendorId:String,
    dateOrdered:{
        type:Date,
       default: (new Date()),
    }
})
module.exports = mongoose.model('order', Order);