var express = require('express');
var router = express.Router();
var signuproutes = require('../api/signup');
var user = require('../modal/usermodel');

router.post('/signup', signuproutes.signup);

module.exports = router;
