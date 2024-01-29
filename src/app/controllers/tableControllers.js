const Product = require('../models/Product')
const Table = require('../models/Table')
//const HistoryOrder = require('../../models/historyOrder')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId từ mongoose
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
const FoodOrdered = require('../models/foodOrdered');

class TableController {
    async index(req, res, next) {
        try {
            const tables = await Table.find({});

            // Use populate to get details from the Product model based on references in FoodOrdered
            const foodsList = await FoodOrdered.find({}).populate('food', 'name price');
            console.log(JSON.stringify(foodsList))

            res.render('tables', {
                tables: mutipleMongooseToObject(tables),
                layout: 'main.hbs',
                foods: JSON.stringify(foodsList)
            });
        } catch (err) {
            next(err);
        }
    }

    async clearTable(req,res, next){
        try{
            await Table.findByIdAndUpdate({_id : req.body.tableId},{
                status : false,
            })
            res.redirect('back')
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = new TableController;
