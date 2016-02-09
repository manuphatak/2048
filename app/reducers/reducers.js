import * as ACTION from '../actions';
import { List } from 'immutable';
import {
  INITIAL_STATE, shiftDown, shiftLeft, shiftRight, shiftUp, createTile, updateGameTiles, addGameTile,
} from '../core';

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return state;
    case ACTION.SHIFT_LEFT:
      return state.updateIn(['game', 'status'], List(), value => shiftLeft(value))
                  .update('game', updateGameTiles);
    case ACTION.SHIFT_RIGHT:
      return state.updateIn(['game', 'status'], List(), value => shiftRight(value))
                  .update('game', updateGameTiles);
    case ACTION.SHIFT_UP:
      return state.updateIn(['game', 'status'], List(), value => shiftUp(value))
                  .update('game', updateGameTiles);
    case ACTION.SHIFT_DOWN:
      return state.updateIn(['game', 'status'], List(), value => shiftDown(value))
                  .update('game', updateGameTiles);
    case ACTION.CREATE_TILE:
      return state.updateIn(['game', 'status'], List(), value => createTile(value, action.payload))
                  .update('game', addGameTile.bind(null, action.payload));

    default:
      return state;
  }
}
