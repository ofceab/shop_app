/**
 * This controller is to handle the /cart request 
 */
const getCart = (req, res) => {
    res.render('shop/cart', {
        pageTitle: 'Your cart ....',
        isAdmin: false,
        isShop: false,
        isCart: true,
        isProductList: false,
        isPresentation: false,
        isAddProduct: false
    });
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

module.exports = {
    getCart,
    checkout
};