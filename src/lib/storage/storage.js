import { storageProvider } from './provider';

export const storage = {
  async get(key) {
    try {
      return JSON.parse(await storageProvider.getItem(key) || '{}');
    }
    catch (error) {
      // TODO handle this
      console.error('unknown error', error); // eslint-disable-line no-console
      return {};
    }
  },

  async set(key, value) {
    return await storageProvider.setItem(key, JSON.stringify(value));
  },
};
