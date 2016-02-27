let loadedModule;

if (__DEV__) {
  loadedModule = require('./configureStore.dev').configureStore;
}
else {
  loadedModule = require('./configureStore.prod').configureStore;
}

export const configureStore = loadedModule;
