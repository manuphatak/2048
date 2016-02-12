import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from './loggerMiddleware';
import shiftTileMiddleware from './shiftTileMiddleware';
import newGameMiddleware from './newGameMiddleware';

export default applyMiddleware.bind(null, thunkMiddleware, newGameMiddleware, shiftTileMiddleware, loggerMiddleware);
