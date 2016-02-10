import { applyMiddleware } from 'redux';

import shiftTileMiddleware from './shiftTileMiddleware';
import newGameMiddleware from './newGameMiddleware';

export default applyMiddleware.bind(null, newGameMiddleware, shiftTileMiddleware);
