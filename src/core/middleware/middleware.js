import thunkMiddleware from 'redux-thunk';
import { identity } from 'lodash';

export const middleware = [ // :off
  thunkMiddleware,
  __DEV__ ? require('./loggerMiddleware').loggerMiddleware : undefined,
].filter(identity); // :on
