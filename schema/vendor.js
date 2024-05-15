const mongoose = require('mongoose');
const crypto = require("crypto");
const { type } = require('os');

const Vendor = mongoose.Schema({
    name:String,
    country:String,
    email:String,
    state:String,
    bName:String,
    bType:String,
    bPhone:String,
    bCity:String,
    bAddress:String,
    bInstagram:String,
    bTwitter:String,
    hash:String,
    salt:String,
    dateRegistered:{
        type:Date,
       default: (new Date()),
    } ,
    noOfSales:Number,
})

Vendor.methods.setPassword = function (password) {

    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 

    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
Vendor.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

module.exports = mongoose.model('vendor', Vendor);