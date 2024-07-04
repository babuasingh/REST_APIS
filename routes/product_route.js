const express = require('express');
const router = express.Router()
const Product = require('../Models/Product.model')
const createError = require('http-errors')
const mongoose = require('mongoose')
const ProductController = require('../Controllers/Product_controller')



//handling the get request via async await
router.get('/',ProductController.getAllProducts)

//getting product by id by async-await
router.get('/:id',ProductController.getProductById)


//handling the post request via async await
router.post('/',ProductController.postProduct)

//deleting the product by it's ID
router.delete('/:id', ProductController.deleteProduct)

//updating the product by it's ID
router.patch('/:id', ProductController.patchProduct)

module.exports = router










