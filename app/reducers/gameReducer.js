import { List } from 'immutable';
import {
  shiftDown, shiftLeft, shiftRight, shiftUp, createTiles, refreshGameTiles, addGameTiles,
} from '../core';
import { INITIAL_STATE } from '../core/constants';
import * as ACTION from '../actions';

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return state;
    case ACTION.SHIFT_LEFT:
      return state.update('status', List(), value => shiftLeft(value))
                  .update(refreshGameTiles);
    case ACTION.SHIFT_RIGHT:
      return state.update('status', List(), value => shiftRight(value))
                  .update(refreshGameTiles);
    case ACTION.SHIFT_UP:
      return state.update('status', List(), value => shiftUp(value))
                  .update(refreshGameTiles);
    case ACTION.SHIFT_DOWN:
      return state.update('status', List(), value => shiftDown(value))
                  .update(refreshGameTiles);
    case ACTION.CREATE_TILE:
      return state.update('status', List(), value => createTiles(value, action.payload))
                  .update(addGameTiles(action.payload));
    default:
      return state;
  }
}
