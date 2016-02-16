import { combineReducers } from 'redux-immutable';
import game from './game';
import root from './root';
import { includeRootReducer } from './utils';

const isLoading = state => state;

export default includeRootReducer(root, combineReducers({ game, isLoading }));
