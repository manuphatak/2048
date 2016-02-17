import * as storageProvider from './provider';
import { INITIAL_STATE } from '../../app/core/constants';
import merge from 'lodash.merge';

const initialState = INITIAL_STATE.toJS();

export const storage = {
  async get(key: string): any {
    try {
      return merge(initialState, JSON.parse(await storageProvider.getItem(key) || {}));
    }
    catch (error) {
      return initialState;
    }
  },

  async set(key: string, value: any): void {
    await storageProvider.setItem(key, JSON.stringify(value));
  },
};
