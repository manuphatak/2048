import { randomTileQuantity, createRandomTileAction } from './utils';
import * as ACTION from '../actions';

export default store => next => action => {
  // setup
  const handle = next(action);

  // Guard, uninteresting actions.
  if (action.type !== ACTION.NEW_GAME) {
    return handle;
  }

  // next
  const nextGameState = store.getState().getIn(['game', 'state']);

  // create action to create a few new tile.
  const newTilesAction = createRandomTileAction(nextGameState, randomTileQuantity());

  // Guard, couldn't create a new tile.  (Board is full.)
  if (!newTilesAction) {
    console.error('no empty tiles', 'newTilesAction', newTilesAction);
    return handle;
  }

  // dispatch action.
  return next(newTilesAction);
};
