const express = require('express')
const path = require('path');

//My Own importation
const productsController = require('../controllers/productsController');
const shopController = require('../controllers/shopController');

//Here create our router object
const router = express.Router();

router.get('/shop', productsController.getAllProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.addToCart);
router.post('/remove', shopController.removeCartItem);
router.get('/detail/:productId', productsController.getproductDetails);
router.get('/checkout', shopController.checkout);

module.exports = router;