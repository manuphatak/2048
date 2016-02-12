import { Map } from 'immutable';
const memoryStorage = Map();

export default {
  async getItem(key) {
    return await memoryStorage.get(key);
  },

  async setItem(key, value) {
    return await memoryStorage.set(key, value);
  },
};
