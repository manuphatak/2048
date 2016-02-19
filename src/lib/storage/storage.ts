import * as storageProvider from './provider';
import { INITIAL_STATE } from '../../app/core/constants';
import * as merge from 'lodash.merge';
import { logError } from 'typings/dist/utils/cli';

const initialState = INITIAL_STATE.toJS();

export const storage = {
  async get(key: string): any {
    try {
      return merge({}, initialState, JSON.parse(await storageProvider.getItem(key) || {}));
    }
    catch (error) {
      console.error('error', error);
      return initialState;
    }
  },

  async set(key: string, value: any) {
    console.log('key', key);
    return await storageProvider.setItem(key, JSON.stringify(value));
  },
};
