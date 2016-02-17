import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
let provider;
if (canUseDOM) {
  provider = require('./localforage');
}
else {
  provider = require('./memoryStorage');
}
const { getItem, setItem } = provider;
export { getItem, setItem }
