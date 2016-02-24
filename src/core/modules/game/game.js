import {
  newGame,
  updateTilesFromValue,
  updateTilesCoordinates,
  updateMeta,
  pushTiles,
  shiftLeft,
  shiftRight,
  shiftUp,
  shiftDown,
} from './model';
import { tileFactory } from './utils';

export const NEW_GAME = '2048/game/NEW_GAME';
export const SHIFT_LEFT = '2048/game/SHIFT_LEFT';
export const SHIFT_RIGHT = '2048/game/SHIFT_RIGHT';
export const SHIFT_UP = '2048/game/SHIFT_UP';
export const SHIFT_DOWN = '2048/game/SHIFT_DOWN';
export const CREATE_TILE = '2048/game/CREATE_TILE';

export default function reducer(state, action) {
  switch (action.type) {
    case NEW_GAME:
      return state.update('state', newGame)
                  .update('meta', meta => meta.merge({
                    score: 0, inProgress: true, gameWon: false, gameOver: false,
                  }));
    case SHIFT_LEFT:
      return state.update('state', updateTilesFromValue)
                  .update('state', shiftLeft)
                  .update('state', updateTilesCoordinates)
                  .update(updateMeta);
    case SHIFT_RIGHT:
      return state.update('state', updateTilesFromValue)
                  .update('state', shiftRight)
                  .update('state', updateTilesCoordinates)
                  .update(updateMeta);
    case SHIFT_UP:
      return state.update('state', updateTilesFromValue)
                  .update('state', shiftUp)
                  .update('state', updateTilesCoordinates)
                  .update(updateMeta);
    case SHIFT_DOWN:
      return state.update('state', updateTilesFromValue)
                  .update('state', shiftDown)
                  .update('state', updateTilesCoordinates)
                  .update(updateMeta);
    case CREATE_TILE: // eslint-disable-line no-case-declarations
      const newTiles = action.payload.map(({ value, col, row, id }) => tileFactory(value, col, row, id));
      return state.update('state', updateTilesCoordinates)
                  .update('state', pushTiles(newTiles));
    default:
      return state;
  }
}

export function handleNewGame() {
  return { type: NEW_GAME };
}

export function handleShiftLeft() {
  return { type: SHIFT_LEFT };
}

export function handleShiftRight() {
  return { type: SHIFT_RIGHT };
}

export function handleShiftDown() {
  return { type: SHIFT_DOWN };
}

export function handleShiftUp() {
  return { type: SHIFT_UP };
}

export function handleCreateTiles(payload) {
  return {
    type: CREATE_TILE, payload,
  };
}
