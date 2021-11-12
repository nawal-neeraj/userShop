var jwt = require('jsonwebtoken');
var user = require('../modal/usermodel');
require('dotenv').config()
const JWTSECRET = process.env.JWT_SECRET;
var tokenCheck = (async function (token, res ) {
    try {
        let decodedToken = jwt.verify(token, JWTSECRET)
        if (!decodedToken.id) {
            return res.send({ status: false, message: "Please login again" });
        }
        let userDetails = await user.findById({ _id: decodedToken.id }).lean();
        return userDetails;
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = { tokenCheck }