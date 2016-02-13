import { randomTileQuantity, createRandomTileAction } from './utils';

import * as ACTION from '../actions';

const actionDispatch = { // :off
  [ACTION.SHIFT_DOWN]: createTiles(() => 1),
  [ACTION.SHIFT_LEFT]: createTiles(() => 1),
  [ACTION.SHIFT_UP]: createTiles(() => 1),
  [ACTION.SHIFT_RIGHT]: createTiles(() => 1),
  [ACTION.NEW_GAME]: createTiles(randomTileQuantity),
}; // :on

export default store => next => action => {
  const handleAction = actionDispatch[action.type];

  // Guard, uninteresting actions.
  if (!handleAction) {return next(action);}

  return handleAction(store, next, action);
};

function createTiles(n) {
  return (store, next, action) => {
    // setup
    const gameState = store.getState().getIn(['game', 'state']);
    const nextHandle = next(action);
    const nextGameState = store.getState().getIn(['game', 'state']);

    // Guard, no change.
    if (gameState.tileValues().equals(nextGameState.tileValues())) {
      return nextHandle;
    }

    const newTileAction = createRandomTileAction(nextGameState, n());
    // Guard, couldn't create a new tile.  (Board is full.)
    if (!newTileAction) {
      console.error('no empty tiles', 'newTile', newTileAction);
      return nextHandle;
    }

    // dispatch action.
    return next(newTileAction);
  };
}
