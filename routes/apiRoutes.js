var express = require('express');
var router = express.Router();
var signuproutes = require('../api/signup');

router.post('/api/signup', signuproutes.signup);
router.post('/api/verifyOtp', signuproutes.verifyOTP);
router.post('/api/signin', signuproutes.signIn)

module.exports = router;
