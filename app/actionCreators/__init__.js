import * as ACTION from '../actions';
import { tileFactory } from '../core/utils';
import { fromJS } from 'immutable';
export function onNewGame() {
  return { type: ACTION.NEW_GAME };
}

export function onShiftLeft() {
  return { type: ACTION.SHIFT_LEFT };
}

export function onShiftRight() {
  return { type: ACTION.SHIFT_RIGHT };
}

export function onShiftDown() {
  return { type: ACTION.SHIFT_DOWN };
}

export function onShiftUp() {
  return { type: ACTION.SHIFT_UP };
}

export function onCreateTile(tiles) {
  return {
    type: ACTION.CREATE_TILE,

    payload: fromJS(tiles.map(({ value, col, row, id }) => tileFactory(value, col, row, id))),
  };
}
