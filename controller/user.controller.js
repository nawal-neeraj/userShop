var user = require('../modal/usermodel');
var userService = require('../services/users.services')

var signup = (async function (req, res, next) {
    var requestBody = new user({
        name: req.body.name,
        username: req.body.username,
        mobile: req.body.mobile,
        dateofbirth: req.body.dateofbirth,
        address: req.body.address,
        password: req.body.password
    });
    let userResponse = await userService.genrateOtp(requestBody, res, next);
    res.send({ status: true, message: 'user saved', userId: userResponse });
});


var verifyOTP = (async function (req, res, next) {
    let otpNum = req.body.otp;
    let userId = req.body.userId;
    let userResponse = await userService.checkOTP(otpNum, userId);
    res.send({ status: userResponse.status, message: userResponse.message });
});

var signIn = (async function (req, res, next) {
    let userNm = req.body.username;
    let userPass = req.body.password;
    let userResponse = await userService.userSignin(userNm, userPass);
    res.send({ status: true, message: 'Login successful', user: userResponse });
});

module.exports = { signup, verifyOTP, signIn };
