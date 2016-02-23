

import * as thunkMiddleware from 'redux-thunk';
import { loggerMiddleware } from './loggerMiddleware';
import { createTilesMiddleware } from './createTilesMiddleware';

export const middleware = [thunkMiddleware, createTilesMiddleware, loggerMiddleware];
