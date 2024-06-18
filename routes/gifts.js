const express = require("express");
const user = require("../schema/user");
const gift = require("../schema/gift");
const order = require("../schema/orders");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const userOrders = require("../schema/userOrders");
const wishlist = require("../schema/wishlist");
const { mail } = require("./modules/mailer");
const router = express.Router();
module.exports = router;

// const allGifts = gift.find()
router
  .get("/get-gift/:giftId", async (req, res) => {
    try {
      res
        .status(200)
        .json({ code: 1, msg: await gift.findById(req.params.giftId) });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .get("/get-gifts-by-category/:category/:length", async (req, res) => {
    console.log(req.params);
    let gifts = [];
    const allGifts = await gift.find();
    try {
      for (let index = 0; index < allGifts.length; index++) {
        if (allGifts[index]["category"].includes(req.params.category)) {
          gifts.push(allGifts[index]);
          if (gifts.length > parseInt(req.params.length) - 1) {
            break;
          }
        }
      }
      res.status(200).json({ code: 1, msg: gifts });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .get("/get-gift", async (req, res) => {
    try {
      res.status(200).json({ code: 1, msg: await gift.find().limit(20) });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .post("/order-gifts", async (req, res) => {
    let gifts = req.body.gifts;
    let orders = [];
    let vendorTracker = [];
    let savingVendorTracker = [];
    try {
      for (let i = 0; i < gifts.length; ) {
        const el = gifts[i];
        if (vendorTracker.includes(el.vendorId)) {
          i++;
        } else {
          let order = {};
          order["vendorId"] = el.vendorId;
          order["products"] = [];
          order["status"] = "pending";
          for (let j = 0; j < gifts.length; j++) {
            if (order["vendorId"] == gifts[j]["vendorId"] && !(order["products"].includes(gifts[j]["_id"]))) {
              order["products"].push({
                giftId: gifts[j]["_id"],
                amount: gifts[j]["amount"],
              });
            }
          }
          orders.push(order);
          vendorTracker.push(el.vendorId);
          i++;
        }
      }

      for (let k = 0; k < orders.length; k++) {
        if (!savingVendorTracker.includes(orders[k].vendorId)) {
          const data = new order(orders[k]);
          data.generalGiftId = req.body.generalGiftId;
          await data.save();
          savingVendorTracker.push(orders[k].vendorId);
        }
      }
      console.log(savingVendorTracker);




      // save to user orders
      let userOrder = new userOrders(req.body);
      userOrder.status = "pending";
      userOrder.generalGiftId = req.body.generalGiftId;
      await userOrder.save();
      res.status(200).json({ code: 1, msg: "Order successfully placed" });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .post("/user-order-gifts", async (req, res) => {
    const data = req.body;
    try {
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .get("/user-orders/:id", async (req, res) => {
    try {
      console.log(await userOrders.find({ userId: req.params.id }));
      res.status(200).json({
        code: 1,
        msg: await userOrders.find({ userId: req.params.id }),
      });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .get("/user-order-details/:id", async (req, res) => {})
  .post("/savewishlist", async (req, res) => {
    try {
      let wishlst = new wishlist({ ...req.body });
      let md = await wishlst.save();
      res.status(200).json({ code: 1, msg: md._id });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .get("/wishlistByUserId/:id", async (req, res) => {
    try {
      res
        .status(200)
        .json({ code: 1, msg: await wishlist.find({ userId: req.params.id }) });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .get("/wishlistDetails/:id", async (req, res) => {
    try {
      res
        .status(200)
        .json({ code: 1, msg: await wishlist.findById(req.params.id) });
    } catch (error) {
      requestErrorHandler(res, error);
    }
  })
  .post("/pay-wishlist", async (req, res) => {
    // update wishlist
    try {
      let wishlis = await wishlist.findById(req.body.id);
      let orde = new order();
      for (let index = 0; index < wishlis.gifts.length; index++) {
        if (wishlis.gifts[index]["_id"] == req.body.wish._id) {
          wishlis.isPaid.push(wishlis.gifts[index]["_id"]);
          orde.products = [wishlis.gifts[index]];
          orde.status = "pending";
          orde.vendorId = wishlis.gifts[index]["vendorId"];
          orde.generalGiftId = Math.random() * 1000000000;
          orde.paymentInfo = req.body.paymentInfo;
          orde.paidBy = req.body.paidBy;
          break;
        }
      }
      await wishlis.save();
      await orde.save();
      res.status(200).json({ code: 1, msg: "Successfully paid" });
    } catch (error) {
      requestErrorHandler(res, error);
    }
    // communicate with vendor
    // send notification to user
  })
  .get("/mail", (req, res) => {
    mail;
  });

async function returnVendorIdFromProd(giftId) {
  return (await gift.findById(giftId)).vendorId;
}
