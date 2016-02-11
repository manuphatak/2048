import { createStore, compose } from 'redux';
import reducer from '../reducers';

import { INITIAL_STATE } from '../core/constants';
import middleware from '../middleware';

export default function makeStore(initialState = INITIAL_STATE) {
  const enhancer = compose(middleware());
  return createStore(reducer, initialState, enhancer);
}
