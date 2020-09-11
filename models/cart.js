const fs = require('fs');
const path = require('path');

//Own importation

const rootDir = require('../helpers/path');
const { parse } = require('path');
const database = require('../helpers/database');

/**
 * 
 * Cart will hold all the data of a shop
 * a Cart has 
 * 
 * list of product, each one contains 
 * the product id and the quanty and the price for optimisation purpose
 * 
 * totalPrice
 */

const cartsource = path.join(rootDir, 'models', 'datasource', 'cart.json');

// const ct = {
//     products: [
//         { productId: 1, price: 25, quantity },
//     ],
//     totalPrice: 0
// }


//Step to build the cart
// Get the cart
// Add the new item
// Update the final price
const cart = class Cart {
    /**
     * This method is to add a product to the cart
     * @param productData is an object
     * {productId: 1, price:25, quantity}
     */
    static addProductToCart(productData) {
        return database.execute('INSERT INTO cart (products, totalPrice) VALUES (?, ?)',
            [JSON.stringify(productData.id), parseInt(productData.quantity) * parseInt(productData.price)])
    }


    static deleteAProduct(index) {
        return database.execute('DELETE FROM cart WHERE cart.id=?', [index]);
    }


    /**
     * This method is to get the total amount of the cart
     */
    static getTotalPrice(products) {
        if (products.length === 0) {
            return 0;
        }
        const total = products.map(prod => (parseInt(prod.quantity) * parseInt(prod.price)));
        const numberTotal = total.reduce((p, n) => p + n);
        return parseInt(numberTotal);
    }

    /**
     * Get the item of the item of the cart
     * {productId: 1, price:25, quantity},
     */
    static getCart() {
        return database.execute('SELECT * FROM cart');
    }
}



//Exportation
module.exports = cart;