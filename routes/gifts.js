const express = require("express");
const user = require("../schema/user");
const gift = require("../schema/gift");
const { requestErrorHandler } = require("../errorHandlers/requestError");
const router = express.Router();
module.exports = router;

const allGifts = gift.find()
router.get('/get-gift/:giftId', async(req, res)=>{
    try {
        res.status(200).json({code:1, msg: await gift.findById(req.params.giftId)})
    } catch (error) {
        requestErrorHandler(res,error)
    }
}).get('/get-gifts-by-category/:category/:length', async (req, res)=>{
    let gifts = []
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
})