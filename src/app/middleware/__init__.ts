import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './loggerMiddleware';
import createTilesMiddleware from './createTilesMiddleware';

export default applyMiddleware.bind(null, thunkMiddleware, createTilesMiddleware, loggerMiddleware);
