import { createRandomTileAction } from './utils';

import * as ACTION from '../actions';

const watchActions = [
  ACTION.SHIFT_DOWN, ACTION.SHIFT_LEFT, ACTION.SHIFT_UP, ACTION.SHIFT_RIGHT,
];

export default store => next => action => {
  if (!watchActions.includes(action.type)) {
    return next(action);
  }
  const state = store.getState();
  const handle = next(action);
  const nextState = store.getState();
  if (state.getIn(['game', 'state']).equals(nextState.getIn(['game', 'state']))) {
    return handle;
  }

  const nextTile = createRandomTileAction(nextState, 1);

  if (nextTile === undefined) {
    console.error('no empty tiles', 'nextTile', nextTile);
    return handle;
  }

  return next(nextTile);
};
