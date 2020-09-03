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

/**
 * edit a product
 */
router.get('/edit/:productId', productsController.getEditProduct);

router.post('/edit', productsController.saveProductUpdate);

/**
 * Delete a product
 */
router.post('/delete', productsController.deteleProduct);



//to get all the product list
router.get('/products', productsController.getProductList)

module.exports = {
    router,
};