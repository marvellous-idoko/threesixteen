
function requestErrorHandler(res, error){
    console.log(error)
    res.status(503).json({code:0,msg:error.message})
}
module.exports = {requestErrorHandler}