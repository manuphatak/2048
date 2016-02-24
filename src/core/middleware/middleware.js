import thunkMiddleware from 'redux-thunk';
import { identity } from 'lodash';
import { createTilesMiddleware } from './createTilesMiddleware';

export const middleware = [ // :off
  thunkMiddleware,
  createTilesMiddleware,
  __DEV__ ? require('./loggerMiddleware').loggerMiddleware : undefined,
].filter(identity); // :on
