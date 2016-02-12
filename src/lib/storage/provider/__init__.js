import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let storage;
if (canUseDOM) {
  storage = require('./localforage');
}
else {
  storage = require('./memoryStorage').default;
}

export default storage;
