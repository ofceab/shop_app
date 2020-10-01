const Product = require("../models/products");
const Cart = require("../models/cart");

/**
 * This controller is to handle the /cart request 
 */
const getCart = (req, res) => {
    req.user.getCart()
        .then(cart => {
            cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle: 'Your cart ....',
                        products: products,
                        price: 0,
                        isAdmin: false,
                        path: '/cart'
                    })
                })
        })
};


const checkout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout now ....',
        isAdmin: false,
        isShop: false,
        isCart: false,
        isProductList: false,
        isPresentation: false,
        isAddProduct: false
    });
};

const addToCart = (req, res) => {
    //Construct the product Object
    const iD = req.body.id;
    const qT = req.body.quantity;
    const price = req.body.price;
    const productObj = {
        id: iD,
        price: price,
        quantity: qT
    };
    Cart.addProductToCart(productObj)
        .then(() => {
            res.redirect('/cart');
        })
    // console.log(productObj);
}


const removeCartItem = (req, res) => {
    const iD = req.body.index;
    Cart.deleteAProduct(iD, () => {
        res.redirect('/cart');
    })
}

module.exports = {
    getCart,
    checkout,
    addToCart,
    removeCartItem
};