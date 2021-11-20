var express = require('express');
var router = express.Router();
var userCtrlRoutes = require('../controller/user.controller');

router.post('/api/signup', userCtrlRoutes.signup);
router.post('/api/verifyOtp', userCtrlRoutes.verifyOTP);
router.post('/api/signin', userCtrlRoutes.signIn);
router.get('/api/tokenVarify/:token', userCtrlRoutes.varifyToken);
router.put('/api/update/:userId', userCtrlRoutes.updateProfile);
router.get('/api/userDetails/:usersId', userCtrlRoutes.getUserDetails);

module.exports = router;
