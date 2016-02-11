import { createRandomTileAction } from './utils';

import * as ACTION from '../actions';

const watchActions = [
  ACTION.SHIFT_DOWN, ACTION.SHIFT_LEFT, ACTION.SHIFT_UP, ACTION.SHIFT_RIGHT,
];

export default store => next => action => {
  if (!watchActions.includes(action.type)) {
    return next(action);
  }
  const gameState = store.getState().getIn(['game', 'state']);
  const handle = next(action);
  const nextGameState = store.getState().getIn(['game', 'state']);

  if (gameState.equals(nextGameState)) {
    return handle;
  }

  const nextTile = createRandomTileAction(nextGameState, 1);

  if (nextTile === undefined) {
    console.error('no empty tiles', 'nextTile', nextTile);
    return handle;
  }

  return next(nextTile);
};
