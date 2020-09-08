/**
 * This file is about connection to the mysql database
 * so all configuration to acces to that database is made here
 */
const mysql = require('mysql2');


//Creaction poolConnection
const mysqlPoolConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Codesource2019',
    database: 'shop-app'
});

module.exports = mysqlPoolConnection.promise();