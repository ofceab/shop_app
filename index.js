const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Personnal importation
const { router } = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorRouter = require('./routes/error');
const homeRouter = require('./routes/home');
const rootDir = require('./helpers/path');
const sequelize = require('./helpers/database');
const User = require('./models/user');
const Product = require('./models/products');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

//Create the application
const app = express();

//Add the engine

//Ejs engine
app.set('view engine', 'ejs');
app.set('views', 'views/ejs-template');



//Pug engine
// app.set('view engine', 'pug');
// app.set('views', 'views');

/**
 * The @bodyParser will be responsible to parse all the text(data) coming 
 * through a form 
 */
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(() => console.log('An error occured'))
})
//TO handle the static file ask
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', router);

//For the shop router part
app.use(shopRouter);

//Home router part 
app.use(homeRouter);

//For the [Note found error]
app.use(errorRouter);

//Etablish all the associations
Product.belongsTo(User, { constraintes: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
//A cart belongs to many product
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({
                username: 'Obed',
                email: 'anemail@gmail.com'
            });
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(() => app.listen(3000, () => console.log('The server is running !')))
    .catch((error) => {
        console.log(error)
    })