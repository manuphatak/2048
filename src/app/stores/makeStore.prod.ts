import { createStore, compose } from 'redux';
import * as thunkMiddleware from 'redux-thunk';
import { reducers } from '../reducers';
import { INITIAL_STATE } from '../core/constants';
import { middleware } from '../middleware';


export function makeStore(initialState = INITIAL_STATE) {
  const enhancer = compose(middleware());

  return createStore(reducers, initialState, enhancer);
}
