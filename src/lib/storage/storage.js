import { storageProvider } from './provider';

export const storage = {
  async get(key) {
    try {
      return JSON.parse(await storageProvider.getItem(key) || {});
    }
    catch (error) {
      console.error('unknown error', error);
      return {};
    }
  },

  async set(key, value) {
    return await storageProvider.setItem(key, JSON.stringify(value));
  },
};
