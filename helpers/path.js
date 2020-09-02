const path = require('path');

const rootDir = path.dirname(require.main.filename); //Here we get the app directory

module.exports = rootDir;