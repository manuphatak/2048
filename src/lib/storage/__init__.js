import storage from './provider';
import { INITIAL_STATE } from '../../app/core/constants';
import merge from 'lodash.merge';

const initialState = INITIAL_STATE.toJS();

export default {
  async get(key) {
    try {
      return merge(initialState, JSON.parse(await storage.getItem(key) || {}));
    }
    catch (error) {
      return initialState;
    }
  },

  async set(key, value) {
    await storage.setItem(key, JSON.stringify(value));
  },
};
