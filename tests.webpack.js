var PATHS = require('./webpack.utils').PATHS;
var context = require.context(PATHS.app, true, /\.spec\.jsx?$/);
context.keys().forEach(context);

module.exports = context;