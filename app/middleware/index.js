import { applyMiddleware } from 'redux';

import shiftTileMiddleware from './shiftTileMiddleware';
import newGameMiddleware from './newGameMiddleware';

export default applyMiddleware(newGameMiddleware, shiftTileMiddleware);
