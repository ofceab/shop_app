const Product = require("../models/products");
const Cart = require("../models/cart");

/**
 * This controller is to handle the /cart request 
 */
const getCart = (req, res) => {
    Cart.getCart((data) => {
        const products = data.products.map(prod => {
            const prodD = Product.getProduct(prod.productId)
            const prods = { ...prodD, ...prod };
            console.log(prods);
            return prods;
        })
        res.render('shop/cart', {
            pageTitle: 'Your cart ....',
            products: products,
            price: data.totalPrice,
            isAdmin: false,
            isShop: false,
            isCart: true,
            isProductList: false,
            isPresentation: false,
            isAddProduct: false
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
    const iD = req.body.index;
    const qT = req.body.quantity
    const productObj = {
        productId: iD,
        price: Product.getProduct(iD).price,
        quantity: qT
    };
    Cart.addProductToCart(productObj, () => {
        console.log('Gui')
        res.redirect('/cart');
    });
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