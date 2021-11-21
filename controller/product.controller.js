var product = require('../modal/productmodel');
var prodServices = require('../services/prod.service')

var productReg = (async function (req, res, next) {
    var requestBody = new product({
        productname: req.body.productname,
        producttype: req.body.producttype,
        userId: req.body.userId
    })
    try {
        let response = await prodServices.registration(requestBody)
        console.log(response)
        res.send({ status: response.status, message: response.message, productDetails: response.ProductDetails })
    } catch (err) {
        console.log(err)
    }
})

var allProduct = (async function (req, res, next) {
    let userId = req.params.userId
    try {
        let response = await prodServices.getallData(userId)
        // console.log(response)
    } catch (err) {
        console.log(err)
    }
})

module.exports = { productReg, allProduct }