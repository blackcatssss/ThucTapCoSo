const Product = require('../models/Product')
const Table = require('../models/Table')
const fs = require('fs');
const path = require('path');
const {mutipleMongooseToObject} = require('../../util/mongoose')

class ManagerMenuControllers{
    async index(req,res,next){
        try{
            Product.find()
                .sort({name: 1})
                .then(product=>{
                    Table.find()
                        .sort({name: 1})
                        .then(Table=>{
                            res.render('managerMenu',{
                                products : mutipleMongooseToObject(product),
                                tables: mutipleMongooseToObject(Table)
                            })
                        })
                        .catch(err => next(err))
                .catch(err => next(err))
                })
        }
        catch(err){
            next(err)
        }
    }

    async editProduct(req, res, next){
        try{
            Product.updateOne({_id: req.params.id}, req.body)
                .then(()=>{
                    res.redirect('back')
                })
                .catch(err=>next(err))
        }catch(err){
            next(err)
        }
    }

    async createProduct(req,res,next){
        try{
            const data = req.body
            const newProduct = new Product;
            newProduct.name = data.name
            newProduct.price = data.price
            newProduct.codeImg = "/assets/"+ req.file.filename
            newProduct.save()
                .then(()=>{
                    res.redirect('back')
                })
                .catch(err => next(err))
        }catch(err){
            next(err)
        }
    }

    async deleteProduct(req, res, next) {
        const id = req.params.id;
        try {
            // Tìm Product để lấy tên ảnh
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Xóa ảnh từ thư mục src/public/assets
            const imagePath = path.join(__dirname, '../../public', product.codeImg);
            console.log(imagePath)
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image', err);
                }
                // Tiếp tục xóa Product sau khi xóa ảnh
                Product.deleteOne({ _id: id })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch((err) => {
                        next(err);
                    });
            });
        } catch (err) {
            next(err);
        }
    }

    async deleteTable(req, res, next){
        try{
            const idTable = req.params.id
            if(idTable){
                Table.deleteOne({_id: idTable})
                    .then(()=>{
                        res.redirect('back')
                    })
                    .catch(err=> next(err))
            }
        }catch(err){
            next(err)
        }
    }

    async editTable(req, res, next){
        try{
            const idTable = req.params.id
            const nameTable = req.body.name.toUpperCase()
            if(idTable){
                Table.updateOne({_id: idTable},{name: nameTable})
                .then(()=>{
                    res.redirect('back')
                })
                .catch(err => next(err))
            }
        }catch(err){
            next(err)
        }
    }
    async createNewTable(req,res,next){
        try{
            const newTable = new Table
            newTable.name = req.body.name.toUpperCase()
            newTable.save()
            .then(()=>{
                res.redirect('back')
            })
            .catch(err => next(err))
        }catch(err){
            next(err)
        }
    }
}

module.exports = new ManagerMenuControllers