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

export function handleCreateTiles(payload) {
  return {
    type: ACTION.CREATE_TILE, payload,
  };
}

export function addPoints(payload) {
  return {
    type: ACTION.ADD_POINTS, payload,
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
  return async(dispatch) => {
    dispatch(setStateInit());
    const state = await get(...args);
    dispatch(setStateComplete(state));
  };
}
