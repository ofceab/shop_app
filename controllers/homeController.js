/**
 * This function is responsible to get back 
 * the home 
 * @param {*} req 
 * @param {*} res 
 */
const getHome = (req, res) => {
    res.render('home/home', {
        pageTitle: 'Welcome to home page',
        isAdmin: false,
        isShop: false,
        isCart: false,
        isProductList: false,
        isPresentation: true,
        isAddProduct: false
    });
};


//Export
module.exports = {
    getHome
};