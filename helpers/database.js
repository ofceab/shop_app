const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop-app-sequelize', 'root', 'Codesource2019', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;