const Sequelize = require('sequelize');

const sequelize = require('../helpers/database');

//Define the cart model
const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;