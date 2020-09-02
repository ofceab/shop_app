const Product = require('../models/products')

/**
 * This function is the addProduct controller, 
 * it allows us to get the addProduct view which 
 * contains the form
 * @param {*} req 
 * @param {*} res 
 */
const addProduct = (req, res) => {
    res.render('admin/add-product', {
        pageTitle: 'Admin panel',
        isAdmin: true,
        isShop: false,
        isCart: false,
        isProductList: false,
        isPresentation: false,
        isAddProduct: true
    });
}


/**
 * This function is to save product after submit the form
 * @param {*} req the request object 
 * @param {*} res the response object
 */
const saveProduct = (req, res) => {
    console.log(req.body);
    const product = new Product(req.body.name, req.body.description, req.body.price, req.body.image);
    product.save()
    res.redirect('/admin/products');
};

/**
 * This controllers handles and output all products available
 * @param {*} req 
 * @param {*} res 
 */
const getAllProduct = (req, res) => {
    const productsList = Product.getAllProduct();
    console.log(productsList);
    res.render('shop/products-list', {
        pageTitle: 'Shopping now .....!',
        products: productsList,
        isAdmin: false,
        isShop: true,
        isProductList: false,
        isCart: false,
        isPresentation: false,
        isAddProduct: false
    });
};

const getProductList = (req, res) => {
    const products = Product.getAllProduct();
    res.render('admin/admin-product-list', {
        pageTitle: 'Admin product list page',
        products: products,
        isAdmin: true,
        isShop: false,
        isCart: false,
        isProductList: true,
        isPresentation: false,
        isAddProduct: false
    });
}


const deteleProduct = (req, res) => {
    console.log(req.body.index)
    Product.deleteProduct(req.body.index);
    res.redirect('/admin/products');
}
//Export controllers 
module.exports = {
    addProduct,
    saveProduct,
    getAllProduct,
    getProductList,
    deteleProduct
};