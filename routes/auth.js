const express = require("express");
const user = require("../schema/user");
const vendor = require("../schema/vendor");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const { sendMail } = require("./modules/mailer");
const router = express.Router();
module.exports = router;

router
  .post("/register", async (req, res) => {
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
  })
  .post("/vendor/registeration", async (req, res) => {
    if (!((await vendor.find({ email: req.body.email })).length > 0)) {
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
          subject: "👋 Welcome to Threesixteen!",
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
        };
        sendMail(options);
      } catch (e) {
        requestErrorHandler(res, e);
      }
    } else {
      res
        .status(409)
        .json({ code: 1, msg: "This email already exist, kindly login." });
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
  })
  .post("/forgot-password", async (req, res) => {
    let userOptions = {
      to: req.body.email,
      subject: "Password Reset Request: Threesixteen!",
    };
    let vendorOptions = {
      to: req.body.email,
      subject: "Password Reset Request: Threesixteen!",
    };
    try {
      let usert = await vendor.findOne({ email: req.body.email });
      if (usert) {
        vendorOptions.html = `
        <div style>
        <h1 style='font-family: "Roboto", sans-serif;'>Password Reset Request</h1>
        <p style='font-family: "Roboto", sans-serif;'> We received a password request from your account at Threesixteen.</p>
        <p style='font-family: "Roboto", sans-serif;'> Tap the button below to change password.</p>
        <a href="https://app.threesixteen.ng/#/forgot-password/vendor?lebalaloma=${usert._id}"> <button style='font-family: "Roboto", sans-serif; background-color: #6b0e00;
            color: white;
            padding: 10px;
            border: 0;
            border-radius: 5px;
            cursor: pointer;
            padding: 10px 20px;'> Reset Password </button> </a>
            <p>Kindly ignore this email, if you didn't make this request.</p>
        `
        sendMail(vendorOptions);
        res.json({code:1})
      } else {
        usert = await user.findOne({ email: req.body.email });
        if (usert) {
          userOptions.html = `
          <div style>
          <h1 style='font-family: "Roboto", sans-serif;'>Password Reset Request</h1>
          <p style='font-family: "Roboto", sans-serif;'> We received a password request from your account at Threesixteen.</p>
          <p style='font-family: "Roboto", sans-serif;'> Tap the button below to change password.</p>
          <a href="https://app.threesixteen.ng/#/forgot-password/user?lebalaloma=${usert._id}"> <button style='font-family: "Roboto", sans-serif; background-color: #6b0e00;
              color: white;
              padding: 10px;
              border: 0;
              border-radius: 5px;
              cursor: pointer;
              padding: 10px 20px;'> Reset Password </button> </a>
              <p>Kindly ignore this email, if you didn't make this request.</p>
          `
          sendMail(userOptions);
          res.json({code:1})
        } else {
          res
            .status(404)
            .json({
              code: 0,
              msg: "Email not found, check the email address and try again",
            });
        }
      }
    } catch {
      requestErrorHandler(res, e);
    }
  }).post("/reset-password", async(req, res)=>{
    let usert = await vendor.findById(req.body.id);
    if (usert) {
      usert.setPassword(req.body.password)
      usert.save()
      res.json({code:1, msg:"Successfully reset password"})
    } else {
      usert = await user.findById(req.body.id);
      if (usert) {
      usert.setPassword(req.body.password)
        res.json({code:1, msg:"Successfully reset password"})
      } else {
        res
          .status(404)
          .json({
            code: 0,
            msg: "Email not found, check the email address and try again",
          });
      }
    }
  })