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
    res.render('shop/products-list', {
        pageTitle: 'Shopping now .....!',
        products: productsList,
        isAdmin: true,
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

/**
 * To edit a product
 * @param {*} req 
 * @param {*} res 
 */
const getEditProduct = (req, res) => {
    const productId = req.params.productId;
    //Getting product data
    const product = Product.getProduct(productId);
    res.render('admin/edit-product', {
        pageTitle: `Edit ${product.title}`,
        product: product,
        isAdmin: true,
        isShop: false,
        isCart: false,
        isProductList: false,
        isPresentation: false,
        isAddProduct: false
    })
};

const saveProductUpdate = (req, res) => {
    const productData = req.body;
    //Getting product data
    Product.updateProduct(productData.index, productData);
    res.redirect('/admin/products');
};



/**
 * To view details of a product 
 * @param {*} req 
 * @param {*} res 
 */
const getproductDetails = (req, res) => {
    const productId = req.params.productId;
    //Getting product data
    const product = Product.getProduct(productId);
    res.render('shop/product-details', {
        pageTitle: `Details of ${product.title}`,
        product: product,
        isAdmin: true,
        isShop: false,
        isCart: false,
        isProductList: false,
        isPresentation: false,
        isAddProduct: false
    });
}


const deteleProduct = (req, res) => {
    Product.deleteProduct(req.body.index);
    res.redirect('/admin/products');
}
//Export controllers 
module.exports = {
    addProduct,
    saveProduct,
    getAllProduct,
    getProductList,
    deteleProduct,
    getproductDetails,
    getEditProduct,
    saveProductUpdate
};