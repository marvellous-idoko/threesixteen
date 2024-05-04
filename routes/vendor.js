const express = require("express");
const gift = require("../schema/gift");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const orders = require("../schema/orders");
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
      vendorId:req.body.vendorId
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
      res
        .status(200)
        .json({
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
      res
        .status(200)
        .json({
          code: 0,
          msg: await orders
            .find({ vendorId: req.params.vendorId })
            .sort({ _id: -1 }),
        });
    } catch (e) {
      requestErrorHandler(res, e);
    }
  })
