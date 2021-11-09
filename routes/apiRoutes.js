var express = require('express');
var router = express.Router();
var userCtrlRoutes = require('../controller/user.controller');

router.post('/api/signup', userCtrlRoutes.signup);
router.post('/api/verifyOtp', userCtrlRoutes.verifyOTP);
router.post('/api/signin', userCtrlRoutes.signIn)

module.exports = router;
