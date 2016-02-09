import * as ACTION from '../actions';
import { onCreateTile } from '../actionCreators';
import { getEmpty } from '../core/utils';
import { List } from 'immutable';

const watchActions = [
  ACTION.SHIFT_DOWN, ACTION.SHIFT_LEFT, ACTION.SHIFT_UP, ACTION.SHIFT_RIGHT,
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

  const emptyTiles = getEmpty(nextState.getIn(['game', 'status'], List()));

  if (!emptyTiles.size) {
    console.error('no empty tiles', 'emptyTiles.toJS()', emptyTiles.toJS());
    return undefined;
  }

  const nextTile = randomChoice(emptyTiles.toList());

  return next(onCreateTile(2, nextTile.get('col'), nextTile.get('row')));
};

function randomChoice(obj) {
  const index = Math.floor(Math.random() * obj.size);
  return obj.get(index);
}
