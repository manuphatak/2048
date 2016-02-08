import * as ACTION from '../actions';
import { onCreateTile } from '../actionCreators';

const watchActions = [
  ACTION.SHIFT_DOWN,
  ACTION.SHIFT_LEFT,
  ACTION.SHIFT_UP,
  ACTION.SHIFT_RIGHT,
];
export const createTileMiddleware = store => next => action => {
  if (watchActions.includes(action)) {
    return next(action);
  }
  const state = store.getState();
  const handle = next(action);
  const nextState = store.getState();
  if (state.equals(nextState)) {
    return handle;
  }
  return next(onCreateTile(2, 0, 0));
};
