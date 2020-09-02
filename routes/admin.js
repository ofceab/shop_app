const express = require('express');
const path = require('path');

//My Own importation
const productsController = require('../controllers/productsController');

//Here create our router object
const router = express.Router();

//To handle the /add-product router that allow the admin to add product
router.get('/add-product', productsController.addProduct);


//To handle the /add-product router that allow the admin to add product
router.post('/add-product', productsController.saveProduct);

router.get('')
/**
 * Delete a product
 */
router.post('/delete', productsController.deteleProduct);

/**
 * edit a product
 */
router.post('/edit',);


//to get all the product list
router.get('/products', productsController.getProductList)

module.exports = {
    router,
};