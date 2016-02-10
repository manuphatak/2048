import { randomTileQuantity, createRandomTileAction } from './utils';
import * as ACTION from '../actions';

export default store => next => action => {
  if (action.type !== ACTION.NEW_GAME) {
    return next(action);
  }
  const handle = next(action);
  const nextState = store.getState();

  const nextTiles = createRandomTileAction(nextState, randomTileQuantity());
  if (nextTiles === undefined) {
    console.error('no empty tiles', 'nextTiles', nextTiles);
    return handle;
  }
  return next(nextTiles);
};
