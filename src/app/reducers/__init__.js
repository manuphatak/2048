import { combineReducers } from 'redux-immutable';
import game from './game';
import root from './root';
import { includeRootReducer } from './utils';

export default includeRootReducer(root, combineReducers({ game }));
