import * as reduxImmutable from 'redux-immutable';
import * as identity from 'lodash.identity';
import { gameReducer } from './game';
import { rootReducer } from './root';
import { includeRootReducer } from './utils';

const { combineReducers } = reduxImmutable;

const mainReducer = combineReducers({ game: gameReducer, isLoading: identity });
export const reducers = includeRootReducer(rootReducer, mainReducer);
