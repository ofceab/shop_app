const rootDir = require('../helpers/path');
const database = require('../helpers/database');

module.exports = class Product {
    /**
     * 
     * @param {*} title of the product
     * @param {*} description of the product
     * @param {*} price of the product
     * @param {*} imageUrl of the product
     */
    constructor(title, description, price, imageUrl, index) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.index = index;
    }

    /**
     * Save the product
     */
    save() {
        //This return a promise
        try {
            return database.execute('INSERT INTO products (title,description,price, imageUrl) VALUES (?, ?, ?, ?)',
                [this.title, this.description, this.price, this.imageUrl]);
        } catch (error) {
            console.log(error.toString());
        }
    }

    /**
     * This function is to turn a product to a json object for storage
     */
    fromProductToJson() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            imageUrl: this.imageUrl
        };
    }

    /**
     * Get all the product from the database
     */
    static getAllProduct() {
        try {
            return database.execute('SELECT * FROM products');
        } catch (error) {
            console.log(error.toString());
        }
    }

    /**
     * Update a product
     */
    static updateProduct(data) {
        try {
            console.log(parseInt(data.index));
            return database.execute('UPDATE products SET title=?, description=?, price=?, imageUrl=? WHERE id= ?',
                [data.name, data.description, parseInt(data.price), data.image, parseInt(data.index)]);
        } catch (error) {
            console.log("'dd" + error.toString());
        }
    }

    /**
     * Delete a product
     */
    static deleteProduct(index) {
        try {
            console.log(index)
            return database.execute('DELETE FROM products WHERE products.id= ?', [index]);
        } catch (error) {
            console.log(error.toString())
        }
    }

    /**
     * Get product data, for a single product
     */
    static getProduct(index) {
        return database.execute('SELECT * FROM products WHERE products.id= ?', [parseInt(index)]);
    }
}