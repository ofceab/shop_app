const express = require('express')
const path = require('path');

//My Own importation
const homeController = require('../controllers/homeController');

//Here create our router object
const router = express.Router();

router.get('/', homeController.getHome);

module.exports = router;