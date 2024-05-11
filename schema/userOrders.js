const mongoose = require("mongoose");

const UserOrder = mongoose.Schema({
  gifts: [],
  status: String,
  // {
  //   enum: {
  //     values: ["pending", "transit", "delivered", "completed"],
  //   },
  // },
  userId: String,
  dateOrdered: {
    type: Date,
    default: new Date(),
  },
  address: String,
  phoneNo: String,
  nameOfReceipient: String,
  paymentInfo: {},
  generalGiftId:String
});
module.exports = mongoose.model("userOrder", UserOrder);
