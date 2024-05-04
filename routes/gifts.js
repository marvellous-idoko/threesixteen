const express = require("express");
const user = require("../schema/user");
const gift = require("../schema/gift");
const order = require("../schema/orders");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const userOrders = require("../schema/userOrders");
const router = express.Router();
module.exports = router;

// const allGifts = gift.find()
router.get('/get-gift/:giftId', async(req, res)=>{
    try {
        res.status(200).json({code:1, msg: await gift.findById(req.params.giftId)})
    } catch (error) {
        requestErrorHandler(res,error)
    }
}).get('/get-gifts-by-category/:category/:length', async (req, res)=>{
    let gifts = []
    const allGifts = gift.find()
    try {
        for (let index = 0; index < allGifts.length; index++) {
            if(allGifts[index]['category'].includes(req.params.category)){
                gifts.push(allGifts[index])
                if(gifts.length > (parseInt(req.params.length) - 1)){
                    break;
                }
            }
        }
        res.status(200).json({code:1,msg:gifts})
    } catch (error) {
        requestErrorHandler(res, error)
    }
}).get('/get-gift', async (req, res)=>{
    try {
        res.status(200).json({code:1, msg: await gift.find().limit(20)})
    } catch (error) {
        requestErrorHandler(res,error)
    }
}).post('/order-gifts', async (req, res)=>{
   let gifts = req.body.gifts
   let orders = []
   let vendorTracker = []
  try {
   for (let i = 0; i < gifts.length; ) {
        const el = gifts[i]
        if(vendorTracker.includes(el.vendorId)){
        i++;
        }else{
        let order = {}
        order['vendorId'] = el.vendorId;
        order['prod'] = [{giftId:el['id'], amount:el['amount']}]
        order['status'] = 'pending'
        for (let j = 0; j < gifts.length; j++) {
            if(order['vendorId'] == gifts[j]['vendorId']){
                order['prod'].push({giftId:gifts[j]['id'], amount:gifts[j]['amount']})
            }
        }
        orders.push(order)
        vendorTracker.push(el.vendorId)
        i++;
    }
    }
     
    for (let k = 0; k < orders.length; k++) {
        const data = new order(orders[k])
        await data.save()
    }
  } catch (error) {
    requestErrorHandler(res, error)
  }
}).post('/user-order-gifts', async(req, res)=>{
    const data = req.body 
   try {
    let userOrder = new userOrders(data)
    userOrder.status = 'pending';
    userOrder.save()
   } catch (error) {
    requestErrorHandler(res, error)
   } 
   
})

async function returnVendorIdFromProd(giftId){
    return (await gift.findById(giftId)).vendorId
}