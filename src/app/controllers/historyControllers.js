const FoodOrdered = require('../models/foodOrdered');
const {mutipleMongooseToObject} = require('../../util/mongoose')


class historyControllers{
    async index(req,res,next){
        try{
            FoodOrdered.find().populate('food').populate('UserCreate')
            .then((history)=>{
                res.render('history',{
                    history: mutipleMongooseToObject(history),
                })
            })
            .catch(err=>next(err))

        }catch(err){
            next(err)
        }
    }
}
module.exports = new historyControllers