const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Personnal importation
const database = require('./helpers/database');
const { router } = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorRouter = require('./routes/error');
const homeRouter = require('./routes/home');
const rootDir = require('./helpers/path');

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

//TO handle the static file ask
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', router);

//For the shop router part
app.use(shopRouter);

//Home router part 
app.use(homeRouter);

//For the [Note found error]
app.use(errorRouter);

app.listen(3000, () => console.log('The server is running !'));