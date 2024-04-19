const express = require("express");
const gift = require("../schema/gift");
const router = express.Router();
module.exports = router;

router.post("/upload-gift", async (req, res) => {
 console.log(req.body)
    const data = new gift({
    imgUrl: req.body.url,
    title: req.body.title,
    model: req.body.model,
    category: req.body.category,
    price: req.body.price,
    prevPrice: req.body.prevPrice,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (e) {
    res.status(500).json({ code: 0, msg: err.message });
  }
})
