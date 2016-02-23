import { createStore, compose, applyMiddleware } from 'redux';
import * as thunkMiddleware from 'redux-thunk';
import { reducers } from '../reducers';
import { INITIAL_STATE } from '../core/constants';
import { reducers } from '../reducers';
import { middleware } from '../middleware';

export function makeStore(initialState = INITIAL_STATE) {
  const enhancer = compose(applyMiddleware(...middleware));

  return createStore(reducers, initialState, enhancer);
}
