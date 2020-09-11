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
        path: '/admin/add-product'
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
        .then(() => {
            res.redirect('/admin/products');
        }).
        catch(() => {
            console.log(error.toString());
        })
};

/**
 * This controllers handles and output all products available
 * @param {*} req 
 * @param {*} res 
 */
const getAllProduct = (req, res) => {
    Product.getAllProduct()
        .then(([products]) => {
            res.render('shop/products-list', {
                pageTitle: 'Shopping now .....!',
                products: products,
                isAdmin: true,
                path: '/shop'
            });
        })
        .catch((e) => console.log(e));
};

const getProductList = (req, res) => {
    Product.getAllProduct()
        .then(([products]) => {
            res.render('admin/admin-product-list', {
                pageTitle: 'Admin product list page',
                products: products,
                isAdmin: true,
                path: '/admin/products'
            });
        })
        .catch((e) => console.log(e));
};

/**
 * To edit a product
 * @param {*} req 
 * @param {*} res 
 */
const getEditProduct = (req, res) => {
    const productId = req.params.productId;
    //Getting product data
    Product.getProduct(productId)
        .then(([[product]]) => {
            console.log(product)
            res.render('admin/edit-product', {
                pageTitle: `Edit ${product.title}`,
                product: product,
                isAdmin: true,
                path: 'admin/edit-product'
            })
        })

};

const saveProductUpdate = (req, res) => {
    const productData = req.body;
    //Getting product data
    Product.updateProduct(productData)
        .then(() => {
            res.redirect('/admin/products');
        });

};



/**
 * To view details of a product 
 * @param {*} req 
 * @param {*} res 
 */
const getproductDetails = (req, res) => {
    const productId = req.params.productId;
    //Getting product data
    Product.getProduct(productId)
        .then(([[product]]) => {
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
        })
        .catch((e) => console.log(e.toString()));
}


const deteleProduct = (req, res) => {
    Product.deleteProduct(req.body.index)
        .then(() => {
            res.redirect('/admin/products');
        })
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