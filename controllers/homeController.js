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
        path: '/'
    });
};


//Export
module.exports = {
    getHome
};