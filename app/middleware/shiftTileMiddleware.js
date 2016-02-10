import { createRandomTileAction } from './utils';

import * as ACTION from '../actions';

const watchActions = [
  ACTION.SHIFT_DOWN, ACTION.SHIFT_LEFT, ACTION.SHIFT_UP, ACTION.SHIFT_RIGHT,
];

export default store => next => action => {
  console.log('action', action);
  if (!watchActions.includes(action)) {
    return next(action);
  }
  const state = store.getState();
  const handle = next(action);
  const nextState = store.getState();
  if (state.equals(nextState)) {
    return handle;
  }

  const nextTile = createRandomTileAction(nextState);
  if (nextTile === undefined) {
    console.error('no empty tiles', 'nextTile', nextTile);
    return handle;
  }
  console.log('nextTile', nextTile);

  return next(nextTile);
};
