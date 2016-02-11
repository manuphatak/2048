import { List, fromJS } from 'immutable';
import {
  shiftDown, shiftLeft, shiftRight, shiftUp, createTiles, refreshGameTiles,
} from '../core';
import { INITIAL_STATE } from '../core/constants';
import * as ACTION from '../actions';
import { tileFactory } from '../core/utils';

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return state;
    case ACTION.SHIFT_LEFT:
      return state.update('state', List(), value => shiftLeft(value))
                  .update(refreshGameTiles);
    case ACTION.SHIFT_RIGHT:
      return state.update('state', List(), value => shiftRight(value))
                  .update(refreshGameTiles);
    case ACTION.SHIFT_UP:
      return state.update('state', List(), value => shiftUp(value))
                  .update(refreshGameTiles);
    case ACTION.SHIFT_DOWN:
      return state.update('state', List(), value => shiftDown(value))
                  .update(refreshGameTiles);
    case ACTION.CREATE_TILE: // eslint-disable-line no-case-declarations
      const newTiles = action.payload.map(({ value, col, row, id }) => tileFactory(value, col, row, id));
      return state.update(refreshGameTiles)
                  .update('state', List(), value => createTiles(value, newTiles));
    default:
      return state;
  }
}
