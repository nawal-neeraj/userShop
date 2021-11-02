const mongodb = require('mongodb');
const mongoose = require('mongoose');
var user = require('../modal/usermodel');

var signup = (function (req, res, next) {
    console.log(req.body.name, req.body.mobile, req.body.password)
    var log = new user({
        name: req.body.name,
        username: req.body.username,
        mobile: req.body.mobile,
        dateofbirth: req.body.dateofbirth,
        address: req.body.address,
        password: req.body.password
    });
    user.findOne({ mobile: log.mobile }).then((response) => {
        if (!response) {
            log.save().then((doc) => {
                console.log('aaa', doc);
                if (doc) {
                    res.send({ status: true, message: 'user saved' });
                } else {
                    res.send({ stauts: false, message: 'user not saved' });
                }
            });
        } else {
            res.send({ status: false, message: 'user already exist' });
        }
    });
});

module.exports = { signup };
