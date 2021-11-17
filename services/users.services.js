var user = require('../modal/usermodel');
var otpGenerator = require('../utils/otp-generater');
var apiKey = require('../config/smsOtp.json');
var jwt = require('jsonwebtoken');
require('dotenv').config()
var key = apiKey.factor.API_KEY;
var senderId = apiKey.factor.SENDER_ID;
const TwoFactor = new (require('2factor'))(key);
const JWTSECRET = process.env.JWT_SECRET;

var genrateOtp = (async function (req, res, next) {
    let userDetails = await user.findOne({ mobile: req.mobile });
    var otpNum = otpGenerator.OTPpassword();
    if (userDetails) {
        return res.send({ status: false, message: 'user already exist' });
    }

    let doc = await req.save();
    if (!doc) {
        return res.send({ stauts: false, message: 'user not saved' });
    }

    let smsSent = TwoFactor.sendTemplate([req.mobile], "StackOTP", [otpNum], senderId)
    if (smsSent) {
        doc.otp = otpNum;
        await doc.save();
        return doc._id;
    }
    return res.send({ stauts: false, message: 'unable to send otp' });

})

var checkOTP = (async function (otpNum, userId) {

    try {
        let result = await user.findOne({ _id: userId, otp: otpNum });
        if (result) {
            result.status = "Active";
            result.save();
            return ({ status: true, message: 'OTP verified successfully' });
        }
        return ({ status: false, message: "OTP did not match" });
    } catch (e) {
        console.log(e);
    }
})

var userSignin = (async function (userNm, userPass) {
    let result = await user.findOne({ username: userNm, password: userPass });
    if (!result) {
        return ({ status: false, message: "Username or Password did not match" });
    }

    let Token = jwt.sign({ id: result._id }, JWTSECRET, { expiresIn: '600000' })

    return ({ status: true, message: "Logged in Succeccfuly", UseResult: result, token: Token });
});

var userUpdate = (async function(userId, requestBody, res){
    let rs = await user.findByIdAndUpdate(userId, requestBody, {new:true})
    return rs;
})


module.exports = { genrateOtp, checkOTP, userSignin, userUpdate };
