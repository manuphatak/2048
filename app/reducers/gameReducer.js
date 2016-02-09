import { List } from 'immutable';
import {
  INITIAL_STATE, shiftDown, shiftLeft, shiftRight, shiftUp, createTile, updateGameTiles, addGameTile,
} from '../core';
import * as ACTION from '../actions';

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return state;
    case ACTION.SHIFT_LEFT:
      return state.update('status', List(), value => shiftLeft(value))
                  .update(updateGameTiles);
    case ACTION.SHIFT_RIGHT:
      return state.update('status', List(), value => shiftRight(value))
                  .update(updateGameTiles);
    case ACTION.SHIFT_UP:
      return state.update('status', List(), value => shiftUp(value))
                  .update(updateGameTiles);
    case ACTION.SHIFT_DOWN:
      return state.update('status', List(), value => shiftDown(value))
                  .update(updateGameTiles);
    case ACTION.CREATE_TILE:
      return state.update('status', List(), value => createTile(value, action.payload))
                  .update(addGameTile.bind(null, action.payload));
    default:
      return state;
  }
}
