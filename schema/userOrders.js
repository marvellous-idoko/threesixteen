const mongoose = require("mongoose");

const UserOrder = mongoose.Schema({
  gifts: [],
  status: {
    type: String,
    enum: "pending" | "transit" | "delivered" | "completed",
  },
  userId: String,
  dateOrdered: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("userOrder", UserOrder);
