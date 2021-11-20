const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    mobile: {
        type: String
    },
    dateofbirth: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    otp: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: "Inactive"
    }
});

var user = mongoose.model('user', userSchema);
module.exports = user;
