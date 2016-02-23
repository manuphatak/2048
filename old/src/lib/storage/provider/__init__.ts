import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
if (canUseDOM) {
  module.exports = require('./localforage');
}
else {
  module.exports = require('./memoryStorage');
}
