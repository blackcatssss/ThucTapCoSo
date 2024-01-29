
const Product = require('../models/Product')
const User = require('../models/User')
const Table = require('../models/Table')
// const HistoryOrder = require('../../models/historyOrder')
const FoodOrdered = require('../models/foodOrdered')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId từ mongoose
const {mutipleMongooseToObject} = require('../../util/mongoose')
const jwt = require('jsonwebtoken');

class HomeController{
  index(req, res, next) {
    Product.find({})
      .then(products => {
        Table.find({ status: false }) // Find tables with status false
          .then(tables => {
            res.render('home',{ // Sửa lỗi ở đây
              products: mutipleMongooseToObject(products),
              tables: mutipleMongooseToObject(tables)
            });
            console.log(products)
          })
          .catch(error => next(error)); // Sửa lỗi ở đây
      })
      .catch(error => next(error)); // Sửa lỗi ở đây
  }
  
    
  async saveOrder(req, res, next) {
      const tableName = req.body.tableId;
      const foodIdsString = req.body.foodIds;
      const foodIdsArray = JSON.parse(foodIdsString).map(id => new ObjectId(id));
      var nameFoods = [];

      try {
          const table = await Table.findByIdAndUpdate(
              { _id: tableName },
              {
                  status: true,
              },
              { upsert: true }
          );

          const productPromises = foodIdsArray.map(element =>
              Product.findById({ _id: element })
                  .then(product => {
                      return product.name;
                  })
                  .catch(err => next(err))
          );

          nameFoods = await Promise.all(productPromises);

          const accessToken = req.cookies.accessToken;

          const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
          console.log(decodedToken)
          const userId = decodedToken.id;

          const foodOrderedPromises = foodIdsArray.map(async foodId => {
              return FoodOrdered.create({
                  food: foodId,
                  table: table._id,
                  UserCreate: userId,
              });
          });

          await Promise.all(foodOrderedPromises);

          res.redirect('back');
      } catch (err) {
          next(err);
      }
  }

  
}


module.exports = new HomeController;
