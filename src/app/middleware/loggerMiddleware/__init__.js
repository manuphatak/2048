import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

if (canUseDOM && process.env.NODE_ENV !== 'production') {
  module.exports = require('./loggerMiddleware.dev.js');
}
else {
  module.exports = require('./loggerMiddleware.prod.js');
}
