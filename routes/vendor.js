const express = require("express");
const gift = require("../schema/gift");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const orders = require("../schema/orders");
const userOrders = require("../schema/userOrders");
const router = express.Router();
module.exports = router;

router
  .post("/upload-gift", async (req, res) => {
    const data = new gift({
      imgUrl: req.body.prodImg,
      title: req.body.title,
      // model: req.body.model,
      category: req.body.category,
      price: req.body.price,
      productDesc: req.body.productDesc,
      productDesc: req.body.productDesc,
      vendorId: req.body.vendorId,
    });
    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (e) {
      res.status(500).json({ code: 0, msg: err.message });
    }
  })
  .get("/get-gift/:vendorId", async (req, res) => {
    try {
      res.status(200).json({
        code: 0,
        msg: await gift
          .find({ vendorId: req.params.vendorId })
          .sort({ _id: -1 }),
      });
    } catch (e) {
      requestErrorHandler(res, e);
    }
  })
  .get("/get-orders/:vendorId", async (req, res) => {
    try {
      res.status(200).json({
        code: 0,
        msg: await orders
          .find({ vendorId: req.params.vendorId })
          .sort({ _id: -1 }),
      });
    } catch (e) {
      requestErrorHandler(res, e);
    }
  })
  .post("/update-order-status", async (req, res) => {
    console.log(req.body);
    let userOrder = await userOrders.findOne({
      generalGiftId: req.body.generalGiftId,
    });
    userOrder.status = "transit";
    await userOrder.save();
    let vendorOrder = await orders.find({
      generalGiftId: req.body.generalGiftId,
    });
    for (let index = 0; index < vendorOrder.length; index++) {
      vendorOrder[index].status = "transit";
      await vendorOrder[index].save();
    }
    res.status(200).json({ code: 1, msg: "Successfully Updated Status" });
  })
  .put("update-product", async (req, res) => {
    let gift = await gift.findOne({ id: req.body.id });
    if (gift) {
      for (const [key, value] of Object.entries(req.body.toUpdate)) {
        gift[key] = value;
        // console.log(`${key}: ${value}`);
        if(gift[key] == 'price'){
          gift['prevPrice'] = gift['price']
          gift['price'] = value
        }
      }
      
      await gift.save()
    }
  });
