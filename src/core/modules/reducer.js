import { combineReducers } from 'redux-immutable';
import rootReducer from './root';
import game from './game';
import { fromJS } from 'immutable';
import { pipe } from './utils';
import _ from 'lodash';
import { INITIAL_STATE } from '../constants';

/**
 * Core redux reducer.
 * @function reducer
 */
export const reducer = pipe(// :off
  INITIAL_STATE,                        // initial state
  toImmutable,                          // ...reducers
  rootReducer,
  combineReducers({ game, isLoading: _.identity })
); // :on

/**
 * Ensure state is an immutable map.
 *
 * @param {(object|immutable.Map)} state
 * @returns {immutable.Map} immutable state.
 */
function toImmutable(state) {
  return fromJS(state);
}

