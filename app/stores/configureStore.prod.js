import { createStore } from 'redux';
import reducer from '../reducers';
import { INITIAL_STATE } from '../core';
export default function makeStore(initialState = INITIAL_STATE) {
  return createStore(reducer, initialState);
}
