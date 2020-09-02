const express = require('express')
const path = require('path');

//My Own importation
const { getAllProduct } = require('../controllers/productsController');
const { getCart, checkout } = require('../controllers/shopController');

//Here create our router object
const router = express.Router();

router.get('/shop', getAllProduct);
router.get('/cart', getCart);
router.get('/checkout', checkout);

module.exports = router;