if (process.env.NODE_ENV === 'production') {
  module.exports = require('./loggerMiddleware.prod');
}
else {
  module.exports = require('./loggerMiddleware.dev');
}
