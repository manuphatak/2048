import {
  shiftDown,
  shiftLeft,
  shiftRight,
  shiftUp,
  pushTiles,
  updateTilesCoordinates,
  newGame,
  updateTilesFromValue,
  updateMeta,
} from '../core';
import { INITIAL_STATE } from '../core/constants';
import * as ACTION from '../actions';
import { tileFactory } from '../core/utils';

const INITIAL_GAME_STATE = INITIAL_STATE.get('game');

export default function gameReducer(game = INITIAL_GAME_STATE, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return game.update('state', newGame)
                 .update('meta', meta => meta.merge({
                   score: 0, inProgress: true, gameWon: false, gameOver: false,
                 }));
    case ACTION.SHIFT_LEFT:
      return game.update('state', updateTilesFromValue)
                 .update('state', shiftLeft)
                 .update('state', updateTilesCoordinates)
                 .update(updateMeta);
    case ACTION.SHIFT_RIGHT:
      return game.update('state', updateTilesFromValue)
                 .update('state', shiftRight)
                 .update('state', updateTilesCoordinates)
                 .update(updateMeta);
    case ACTION.SHIFT_UP:
      return game.update('state', updateTilesFromValue)
                 .update('state', shiftUp)
                 .update('state', updateTilesCoordinates)
                 .update(updateMeta);
    case ACTION.SHIFT_DOWN:
      return game.update('state', updateTilesFromValue)
                 .update('state', shiftDown)
                 .update('state', updateTilesCoordinates)
                 .update(updateMeta);
    case ACTION.CREATE_TILE: // eslint-disable-line no-case-declarations
      const newTiles = action.payload.map(({ value, col, row, id }) => tileFactory(value, col, row, id));
      return game.update('state', updateTilesCoordinates)
                 .update('state', pushTiles(newTiles));
    default:
      return game;
  }
}
