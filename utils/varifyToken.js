var jwt = require('jsonwebtoken');
var redis = require('redis');
const redisRes = require('../utils/redisCache')
var user = require('../modal/usermodel');
require('dotenv').config()
const JWTSECRET = process.env.JWT_SECRET;

// const Redis_Port = process.env.PORT || 6379;

// const saveUser = redis.createClient(Redis_Port);

var tokenCheck = (async function (token, res ) {
    try {
        let decodedToken = await jwt.verify(token, JWTSECRET)
        if (!decodedToken.id) {
            return res.send({ status: false, message: "Please login again" });
        }
        let userDetails = await user.findById({ _id: decodedToken.id }).lean();
        let resRedis = await redisRes.redisSave(decodedToken.id ,userDetails, res)
        return userDetails;
    }
    catch (e) {
        console.log(e)
        return res.send({ status: false, message: "Please login again" })
    }
})

module.exports = { tokenCheck }