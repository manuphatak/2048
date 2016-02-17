import * as redux from 'redux';
import * as thunkMiddleware from 'redux-thunk';
import { loggerMiddleware } from './loggerMiddleware';
import { createTilesMiddleware } from './createTilesMiddleware';
const { applyMiddleware }  = redux;

export function middleware() {
  return applyMiddleware(thunkMiddleware, createTilesMiddleware, loggerMiddleware)
}
