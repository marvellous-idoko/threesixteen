const express = require("express");
const user = require("../schema/user");
const vendor = require("../schema/vendor");
const router = express.Router();
module.exports = router;

router.post("/register", async (req, res) => {
  const data = new user({
    name: req.body.name,
    id: req.body.id,
    email: req.body.email,
    idToken: req.body.idToken,
    photoUrl: req.body.photoUrl,
    provider: req.body.provider,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (e) {
    res.status(500).json({ code: 0, msg: err.message });
  }
});

router.post("/vendor/registeration", async (req, res)=>{
   
    const data = new vendor({
        name: req.body.name,
        country: req.body.country,
        email: req.body.email,
        state: req.body.state,
        bName: req.body.bName,
        bType: req.body.bName,
        bPhone: req.body.bPhone,
        bCity: req.body.bCity,
        bAddress: req.body.bAddress,
        bInstagram: req.body.bInstagram,
        bTwitter: req.body.bTwitter
      });
      data.setPassword(req.body.password)
      try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
      } catch (e) {
        res.status(500).json({ code: 0, msg: err.message });
      }
})


