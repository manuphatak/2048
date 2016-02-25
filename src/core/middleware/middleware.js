import thunkMiddleware from 'redux-thunk';
import _ from 'lodash';
import { createTilesMiddleware } from './createTilesMiddleware';

export const middleware = [ // :off
  thunkMiddleware,
  createTilesMiddleware,
  __DEV__ ? require('./loggerMiddleware').loggerMiddleware : undefined,
].filter(_.identity); // :on
