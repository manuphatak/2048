import * as ACTION from '../actions';

export function handleNewGame() {
  return { type: ACTION.NEW_GAME };
}

export function handleShiftLeft() {
  return { type: ACTION.SHIFT_LEFT };
}

export function handleShiftRight() {
  return { type: ACTION.SHIFT_RIGHT };
}

export function handleShiftDown() {
  return { type: ACTION.SHIFT_DOWN };
}

export function handleShiftUp() {
  return { type: ACTION.SHIFT_UP };
}

export function onCreateTile(payload) {
  return {
    type: ACTION.CREATE_TILE, payload,
  };
}

function setStateInit() {
  return { type: ACTION.SET_STATE_INIT };
}

function setStateComplete(payload) {
  return {
    type: ACTION.SET_STATE_COMPLETE, payload,
  };
}

export function setState(get, ...args) {
  return function (dispatch) {
    dispatch(setStateInit());
    return get(...args)
      .then(state => dispatch(setStateComplete(state)));
  }
}
