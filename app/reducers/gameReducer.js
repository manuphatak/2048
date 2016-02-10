import { List } from 'immutable';
import {
  shiftDown, shiftLeft, shiftRight, shiftUp, createTiles, updateGameTiles, addGameTiles,
} from '../core';
import { INITIAL_STATE } from '../core/constants';
import * as ACTION from '../actions';

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      console.log('action.type', action.type);
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
      // TODO fix
      return state.update('status', List(), value => createTiles(value, action.payload))
                  .update(addGameTiles.bind(null, action.payload.get(0)));
    default:
      return state;
  }
}
