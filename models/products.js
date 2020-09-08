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
        return database.execute('SELECT * FROM products WHERE products.id= ?', [parseInt(index)]);
    }
}