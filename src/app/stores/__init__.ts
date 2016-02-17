if (process.env.NODE_ENV === 'production') {
  module.exports = require('./makeStore.prod.ts');
}
else {
  module.exports = require('./makeStore.dev.ts');
}
