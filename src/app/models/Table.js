const mongoose = require('mongoose');
const Product = require('../models/Product')
const Schema = mongoose.Schema;
const Table = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        status:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Table', Table);
 