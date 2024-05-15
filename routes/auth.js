const express = require("express");
const user = require("../schema/user");
const vendor = require("../schema/vendor");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const router = express.Router();
module.exports = router;

router.post("/register", async (req, res) => {
  try {
    let ud = await user.find({ id: req.body.id });
    if (ud.length > 0) {
      res.status(200).json();
    } else {
      const data = new user({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email,
        idToken: req.body.idToken,
        photoUrl: req.body.photoUrl,
        provider: req.body.provider,
      });
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    }
  } catch (e) {
    res.status(500).json({ code: 0, msg: err.message });
  }
});

router
  .post("/vendor/registeration", async (req, res) => {
    console.log(req.body);
    if(!((await vendor.find({email:req.body.email})).length > 0)){
      
    const data = new vendor({
      name: req.body.name,
      country: req.body.country,
      email: req.body.email,
      state: req.body.state,
      bName: req.body.bName,
      bType: req.body.bType,
      bPhone: req.body.bPhone,
      bCity: req.body.bCity,
      bAddress: req.body.bAddress,
      bInstagram: req.body.bInstagram,
      bTwitter: req.body.bTwitter,
    });
    data.setPassword(req.body.password);
    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (e) {
      requestErrorHandler(res, e);
    }
  }else{
    res.status(409).json({code:1, msg:"This email already exist, kindly login."})
  }

  })
  .post("/vendor/signin", async (req, res) => {
    try {
      let vendoRes = await vendor.findOne({ email: req.body.email });
      if (vendoRes && vendoRes.validPassword(req.body.password)) {
        vendoRes["hash"] = "";
        vendoRes["salt"] = "";
        res.status(200).json({ code: 1, msg: vendoRes });
      } else {
        res.status(401).json({ code: 0, msg: "invalid credentials" });
      }
    } catch (e) {
      requestErrorHandler(e, res);
    }
  });
