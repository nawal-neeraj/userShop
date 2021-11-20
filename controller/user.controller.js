var user = require('../modal/usermodel');
var userService = require('../services/users.services')
var tokenVarify = require('../utils/varifyToken')
var getDetails = require('../utils/redisGet')

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
    res.send({ status: userResponse.status, message: userResponse.message, user: userResponse.UseResult, token: userResponse.token });
});

var varifyToken = (async function (req, res) {
    let token = req.params.token
    let validateToken = await tokenVarify.tokenCheck(token, res)
    res.send({ status: true, userDeils: validateToken })
});

var updateProfile = (async function (req, res) {
    let userId = req.params.userId
    var requestBody = {
        name: req.body.name,
        username: req.body.username,
        mobile: req.body.mobile,
        dateofbirth: req.body.dateofbirth,
        address: req.body.address,
    }
    let result = await userService.userUpdate(userId, requestBody, res)
    if (!result) {
        return res.status(404).send({ message: 'user not found' })
    }
    res.status(200).send({ message: "Updated successfully!" })
});

var getUserDetails = (async function (req, res, next) {
    let usersId = req.params.usersId;
    let userDetail = getDetails.redisGetDetails(usersId, res)
});

module.exports = { signup, verifyOTP, signIn, varifyToken, updateProfile, getUserDetails };
