const fs = require('fs');
const path = require('path');

const rootDir = require('../helpers/path');
const { parse } = require('path');

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
        if (fs.existsSync(path.join(rootDir, 'models', 'datasource', 'data.json'))) {
            const data = fs.readFileSync(path.join(rootDir, 'models', 'datasource', 'data.json'), {
                encoding: 'utf8'
            });
            const tempData = JSON.parse(data);
            tempData.push(this.fromProductToJson());
            console.log(this.fromProductToJson());
            fs.writeFileSync(path.join(rootDir, 'models', 'datasource', 'data.json'), JSON.stringify(tempData));
        }

        else {
            const initProducts = []; //Here for initialisation
            initProducts.push(this.fromProductToJson()); //Add data into array
            fs.writeFileSync(path.join(rootDir, 'models', 'datasource', 'data.json'), JSON.stringify(initProducts));
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
        if (fs.existsSync(path.join(rootDir, 'models', 'datasource', 'data.json'))) {
            const productsJSON = JSON.parse(fs.readFileSync(path.join(rootDir, 'models', 'datasource', 'data.json'), {
                encoding: 'utf8'
            }));

            const products = [];
            for (let i = 0; i < productsJSON.length; i++) {
                products.push((new Product(productsJSON[i].title, productsJSON[i].description, productsJSON[i].price, productsJSON[i].imageUrl, parseInt(i))));
            }
            return products;
        }

        else {
            return []; //So there is no data
        }
    }

    /**
     * Update a product
     */
    static updateProduct(index, data) {
        if (index !== undefined) {
            const productsList = Product.getAllProduct();
            productsList[index].description = data.description;
            productsList[index].price = data.price;
            productsList[index].imageUrl = data.image;
            productsList[index].title = data.name;

            //Convert them to json again
            const productInJson = productsList.map(product => product.fromProductToJson());
            fs.writeFileSync(path.join(rootDir, 'models', 'datasource', 'data.json'), JSON.stringify(productInJson));
        }
    }

    /**
     * Delete a product
     */
    static deleteProduct(index) {
        if (index !== undefined) {
            const productList = Product.getAllProduct()
            const filteredListProduct = [];
            const ind = parseInt(index);
            for (let i = 0; i < productList.length; i++) {
                if (ind != i) {
                    filteredListProduct.push(productList[i]);
                }
            }
            const productInJson = filteredListProduct.map(product => product.fromProductToJson());
            fs.writeFileSync(path.join(rootDir, 'models', 'datasource', 'data.json'), JSON.stringify(productInJson));
        }
    }

    /**
     * Get product data, for a single product
     */
    static getProduct(index) {
        const products = this.getAllProduct();
        return products[parseInt(index)]; //Returning the data
    }
}