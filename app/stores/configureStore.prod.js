import {createStore} from 'redux';
import reducer from '../reducers';
import { Map } from 'immutable';

export default function makeStore(initialState = Map()) {
  return createStore(reducer, initialState);
}
