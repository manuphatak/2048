import * as ACTION from '../actions';

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
