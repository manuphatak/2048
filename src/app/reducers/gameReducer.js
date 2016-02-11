import { List, fromJS } from 'immutable';
import {
  shiftDown, shiftLeft, shiftRight, shiftUp, pushTiles, refreshGameTiles,
} from '../core';
import { INITIAL_STATE } from '../core/constants';
import * as ACTION from '../actions';
import { tileFactory } from '../core/utils';

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return state;
    case ACTION.SHIFT_LEFT:
      return state.update('state', shiftLeft)
                  .update('state', refreshGameTiles);
    case ACTION.SHIFT_RIGHT:
      return state.update('state', shiftRight)
                  .update('state', refreshGameTiles);
    case ACTION.SHIFT_UP:
      return state.update('state', shiftUp)
                  .update('state', refreshGameTiles);
    case ACTION.SHIFT_DOWN:
      return state.update('state', shiftDown)
                  .update('state', refreshGameTiles);
    case ACTION.CREATE_TILE: // eslint-disable-line no-case-declarations
      const newTiles = action.payload.map(({ value, col, row, id }) => tileFactory(value, col, row, id));
      return state.update('state', refreshGameTiles)
                  .update('state', pushTiles(newTiles));
    default:
      return state;
  }
}
