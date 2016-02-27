let loadedModule;

if (__DEV__) {
  loadedModule = require('./loggerMiddleware').loggerMiddleware;
}
else {
  loadedModule = () => next => action => next(action);
}

export const loggerMiddleware = loadedModule;
