const express = require('express');
const path = require('path');

//importation
const errorController = require('../controllers/errorController');


const router = express.Router();

//To handle the erro page 
router.use(errorController.get404Error);

module.exports = router;