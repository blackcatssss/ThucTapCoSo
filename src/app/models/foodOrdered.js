const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodOrdered = new Schema(
    {
        food:{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        table: {
            type: Schema.Types.ObjectId,
            ref: 'Table', // Reference to the Table model
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('foodOrdered', foodOrdered);
 