import * as ACTION from '../actions';
import { Map } from 'immutable';

export default function appReducer(state = Map(), action) {
  console.log('action', action);
  console.log('state', state);

  switch (action.type) {
    case ACTION.NEW_GAME:
      return state;
    case ACTION.SHIFT_LEFT:
      return state.update('value', 0, value => value + 1);
    case ACTION.SHIFT_RIGHT:
      return state.update('value', 0, value => value + 1);
    case ACTION.SHIFT_UP:
      return state.update('value', 0, value => value + 1);
    case ACTION.SHIFT_DOWN:
      return state.update('value', 0, value => value + 1);
    default:
      return state;
  }
}
