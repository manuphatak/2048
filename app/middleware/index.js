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
  next(action);
  const result = next(onCreateTile(2, 0, 0));
  return result;
}
