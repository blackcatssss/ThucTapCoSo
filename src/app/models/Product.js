const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        },
        codeImg:{
            type: String,
            required: true
        },
        deleted:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', Product);
 