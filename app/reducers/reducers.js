import * as ACTION from '../actions';
import { List } from 'immutable';
import { INITIAL_STATE } from '../core';
import { shiftDown, shiftLeft, shiftRight, shiftUp, createTile } from '../core';

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return state;
    case ACTION.SHIFT_LEFT:  // :off
      return state.updateIn(['game', 'status'], List(), value => shiftLeft(value));  // :on
    case ACTION.SHIFT_RIGHT:  // :off
      return state.updateIn(['game', 'status'], List(), value => shiftRight(value));  // :on
    case ACTION.SHIFT_UP:// :off
      return state.updateIn(['game', 'status'], List(), value => shiftUp(value));  // :on
    case ACTION.SHIFT_DOWN:// :off
      return state.updateIn(['game', 'status'], List(), value => shiftDown(value));  // :on
    case ACTION.CREATE_TILE:// :off
      return state.updateIn(['game', 'status'], List(), value => createTile(value, action.payload));  // :on

    default:
      return state;
  }
}
