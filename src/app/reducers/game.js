import { shiftDown, shiftLeft, shiftRight, shiftUp, pushTiles, refreshGameTiles, newGame } from '../core';
import { INITIAL_STATE } from '../core/constants';
import * as ACTION from '../actions';
import { tileFactory } from '../core/utils';

const INITIAL_GAME_STATE = INITIAL_STATE.get('game');

export default function gameReducer(game = INITIAL_GAME_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return game.update('state', newGame);
    case ACTION.SHIFT_LEFT:
      return game.update('state', shiftLeft)
                 .update('state', refreshGameTiles);
    case ACTION.SHIFT_RIGHT:
      return game.update('state', shiftRight)
                 .update('state', refreshGameTiles);
    case ACTION.SHIFT_UP:
      return game.update('state', shiftUp)
                 .update('state', refreshGameTiles);
    case ACTION.SHIFT_DOWN:
      return game.update('state', shiftDown)
                 .update('state', refreshGameTiles);
    case ACTION.CREATE_TILE: // eslint-disable-line no-case-declarations
      const newTiles = action.payload.map(({ value, col, row, id }) => tileFactory(value, col, row, id));
      return game.update('state', refreshGameTiles)
                 .update('state', pushTiles(newTiles));
    default:
      return game;
  }
}
