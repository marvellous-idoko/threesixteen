const express = require("express");
const user = require("../schema/user");
const vendor = require("../schema/vendor");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const { sendMail } = require("./modules/mailer");
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
}).post("/vendor/registeration", async (req, res) => {
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
      let options = {
        to: req.body.email,
        subject: '👋 Welcome to Threesixteen!',
        html: `
        <div style>
        <h1 style='font-family: "Roboto", sans-serif;'>Verify your Email address</h1>
        <p style='font-family: "Roboto", sans-serif;'> We're are happy you're here. Let's verify your email address. </p>
        <p style='font-family: "Roboto", sans-serif;'>Click on the link below to verify your email address.</p>
        <a href="https://app.threesixteen.ng/#/vendor-signin"> <button style='font-family: "Roboto", sans-serif; background-color: #6b0e00;
            color: white;
            padding: 10px;
            border: 0;
            border-radius: 5px;
            cursor: pointer;
            padding: 10px 20px;'> Verify Email </button> </a>
        `,
      }
      
      sendMail(options)
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
