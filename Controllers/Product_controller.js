const Product = require('../Models/Product.model')
const mongoose = require('mongoose')
const createError = require('http-errors')

module.exports = {
    getAllProducts : async (req,res,next)=>{
        try {
            const allproducts = await Product.find()
            res.send(allproducts)
        } catch (error) {
            console.log(error);
        }
    },
    getProductById : async (req,res,next)=>{
        // console.log(req.params.id);
        try {
            // const idproduct = await Product.findById(req.params.id)
            const idproduct = await Product.findOne({_id : req.params.id})
            if(!idproduct){
                throw createError(404,'The item does not exist')
            }
            else{
            res.send(idproduct)
            }
        } catch (error) {
            // console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Product Id'))
            }
            else{
            next(error)
            }
        }
    },
    postProduct : async (req,res,next)=>{
        try {
            const product =new Product(req.body)
            const result = await product.save()
            res.send(product)
        } catch (error) {
            if(error.name === 'ValidationError'){
                next(createError(422,error.message))
                return;
            }
            next(error)
        }
    },
    deleteProduct : async (req, res, next) => {
        try {
            const id=req.params.id;
            // console.log(id);
            const result=await Product.findByIdAndDelete(id)
            if(!result){
                throw createError(404,'The item you are trying to delete does not exist')
            }
            else{
                res.send(result)
            }
        } catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Product Id'))
            }
            else{
            next(error)
            }
        }
    },
    patchProduct : async (req, res, next) => {
        try {
            const id=req.params.id;
            const update=req.body
            const result = await Product.findByIdAndUpdate(id,update,{new : true})
            if(!result){
                throw createError(404,'The product you are trying to update does not exist')
            }
            else{
            res.send(result)
            console.log('Product Updated');
            }
        } catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Product Id'))
            }
            else{
            next(error)
            }
        }
    }
}