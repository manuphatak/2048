import { createRandomTileAction } from './utils';
import * as ACTION from '../actions';

export default store => next => action => {
  if (action.type !== ACTION.NEW_GAME) {
    return next(action);
  }
  const handle = next(action);
  const nextState = store.getState();

  const nextTile = createRandomTileAction(nextState);
  if (nextTile === undefined) {
    console.error('no empty tiles', 'nextTile', nextTile);
    return handle;
  }
  return next(nextTile);
};
