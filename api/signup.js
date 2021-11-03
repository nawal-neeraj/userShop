const mongodb = require('mongodb');
const mongoose = require('mongoose');
var user = require('../modal/usermodel');
var otpGenerator = require('../utils/otp-generater');
var apiKey = require('../config/smsOtp.json');

var key = apiKey.factor.API_KEY;
console.log(key)
var senderId = apiKey.factor.SENDER_ID
const TwoFactor = new (require('2factor'))(key);

var signup = (function (req, res, next) {
    var log = new user({
        name: req.body.name,
        username: req.body.username,
        mobile: req.body.mobile,
        dateofbirth: req.body.dateofbirth,
        address: req.body.address,
        password: req.body.password
    });
    user.findOne({ mobile: log.mobile }).then((response) => {
        console.log("====>",log.mobile)
        var otpNum = otpGenerator.OTPpassword()
        console.log(otpNum)
        if (!response) {
            log.save().then((doc) => {
                if (doc) {
                    TwoFactor.sendTemplate([log.mobile], "StackOTP", [otpNum], senderId)
                    .then( async (res) => {
                        console.log("sms",res)
                        if(res){
                            doc.otp = otpNum
                            await doc.save();
                        }
                    })
                    res.send({ status: true, message: 'user saved', userId: doc._id });
                } else {
                    res.send({ stauts: false, message: 'user not saved' });
                }
            });
        } else {
            res.send({ status: false, message: 'user already exist' });
        }
    });

});


var verifyOTP = (async function (req, res, next){
    let otpNum = req.body.otp
    let userId = req.body.userId

    let result = await user.findOne({_id: userId, otp: otpNum})
    if(result){
        return res.send({status: true, message:'OTP verified successfully'})
    }
    res.send("OTP not matched");
});

module.exports = { signup, verifyOTP };
