var product = require('../modal/productmodel');
var user = require('../modal/usermodel')

var registration = (async function (requestBody) {
    let resp = await product.findOne({ productname: requestBody.productname });
    if (resp) {
        return ({ status: false, message: "Prodct exist" });
    }
    let result = await requestBody.save();
    if (!result) {
        return ({ status: false, message: "Product not saved!!" });
    }
    return ({ status: true, message: "Product Saved", ProductDetails: result });
})


var getallData = (async function (id) {
    let resuslt = await product.find({userId:id}).populate('userId')
    console.log("====>", resuslt)
})
module.exports = { registration, getallData }
