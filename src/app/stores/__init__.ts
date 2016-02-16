if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod.ts');
}
else {
  module.exports = require('./configureStore.dev.ts');
}
