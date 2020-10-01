const Product = require('../models/products');

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
    req.user.createProduct(
        {
            title: req.body.name,
            description: req.body.description,
            price: parseInt(req.body.price),
            imageUrl: req.body.image
        }
    ).then(() => {
        res.redirect('/admin/products');
    })
        .
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
    Product.findAll()
        .then(products => {
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
    Product.findAll()
        .then(products => {
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
    Product.findAll({
        where: {
            id: parseInt(productId)
        }
    })
        .then(([product]) => {
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
    console.log(productData);
    //Getting product data
    Product.findAll({
        where: {
            id: parseInt(productData.index),
        }
    })
        .then(([product]) => {
            product.title = productData.name;
            product.price = parseInt(productData.price);
            product.imageUrl = productData.image;
            product.description = productData.description;
            return product.save();
        })
        .then(() => res.redirect('/admin/products'))
        .catch(error => console.error(error))

};



/**
 * To view details of a product 
 * @param {*} req 
 * @param {*} res 
 */
const getproductDetails = (req, res) => {
    const productId = req.params.productId;
    //Getting product data
    Product.findAll({
        where: {
            id: productId
        }
    })
        .then(([product]) => {
            console.log(product)
            res.render('shop/product-details', {
                pageTitle: `Details of ${product.title}`,
                product: product,
                isAdmin: true,
                path: 'shop/details'
            });
        })
        .catch((e) => console.log(e.toString()));
}


const deteleProduct = (req, res) => {
    Product.destroy({
        where: {
            id: parseInt(req.body.index)
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(error => console.error(error));

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