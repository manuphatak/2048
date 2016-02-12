import { createRandomTileAction } from './utils';

import * as ACTION from '../actions';

const watchActions = [
  ACTION.SHIFT_DOWN, ACTION.SHIFT_LEFT, ACTION.SHIFT_UP, ACTION.SHIFT_RIGHT,
];

export default store => next => action => {
  // setup
  const gameState = store.getState().getIn(['game', 'state']);
  const handle = next(action);

  // Guard, uninteresting actions.
  if (!watchActions.includes(action.type)) {
    return handle;
  }

  // next
  const nextGameState = store.getState().getIn(['game', 'state']);

  // Guard, no change.
  if (gameState.equals(nextGameState)) {
    return handle;
  }

  // create action to create one new tile.
  const newTileAction = createRandomTileAction(nextGameState, 1);

  // Guard, couldn't create a new tile.  (Board is full.)
  if (!newTileAction) {
    console.error('no empty tiles', 'newTile', newTileAction);
    return handle;
  }

  // dispatch action.
  return next(newTileAction);
};
