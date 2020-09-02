/**
 * This controller is to handle and manage any error
 * @param {*} req 
 * @param {*} res 
 */
const get404Error = (req, res) => {
    res.status(404).render('error/error', {
        pageTitle: 'Page not found ',
        pageName: req.url,
        isAdmin: false,
        isShop: false,
        isCart: false,
        isProductList: false,
        isPresentation: false,
        isAddProduct: false
    })
};


module.exports = {
    get404Error
};