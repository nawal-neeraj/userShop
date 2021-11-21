const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
    productname: {
        type: String
    },

    producttype: {
        type: String
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

var product = mongoose.model('product', productSchema);
module.exports = product;
