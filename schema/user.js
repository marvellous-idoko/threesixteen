const mongoose = require('mongoose');

const User = mongoose.Schema({
    name:String,
    dateCreated:Date,
    id:String,
    email:String,
    idToken:String,
    photoUrl:String,
    provider:String,
    phone:String
})
module.exports = mongoose.model('user', User);