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
    }
});

var user = mongoose.model('user', userSchema);
module.exports = user;
