const mongoose = require('mongoose');

const Order = mongoose.Schema({
    products:[],
    status:string,
    vendorId:string,
    dateMade:new Date()
})
module.exports = mongoose.model('order', Order);