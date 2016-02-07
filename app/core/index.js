import { List, fromJS } from 'immutable';

const U = undefined; // eslint-disable-line id-length

export const INITIAL_STATE = fromJS({
  game: {
    status: fromJS([  // :off
      [U, U, U, U],
      [U, U, U, 2],
      [U, U, 4, U],
      [U, U, U, U],
    ]),  // :on
  },
});

export function shiftLeft(state) {
  return state.map(col => shift(col));
}

export function shiftUp(state) {
  return transpose(shiftLeft(transpose(state)));
}

export function shiftRight(state) {
  return state.map(col => shift(col.reverse()).reverse());
}

export function shiftDown(state) {
  return transpose(shiftRight(transpose(state)));
}

export function shift(state) {
  return List(_shift(...state.values())).setSize(state.size);
}

export function getTiles(state) {
  return state
    .map((row, rowIndex) => row.map((value, colIndex) => {
      if (value === undefined) {
        return value;
      }
      return tileFactory(value, colIndex, rowIndex);
    }))
    .flatten(true)
    .filter(x => x !== undefined);
}

export function transpose(state) {
  return state.map((col, index) => state.map(row => row.get(index)));
}

export function tileFactory(value, col, row) {  // :off
  return fromJS({ value, col, row });  // :on
}

function _shift(x, ...xs) {
  // Guard last item.
  if (!xs.length) {
    return [x];
  }

  // Guard shift undefined
  if (x === undefined) {
    return _shift(...xs);
  }

  // next
  const [y, ...ys] = xs.filter(z => z !== undefined);

  // combine blocks
  if (x === y) {  // :off
    return [x + y, ..._shift(...ys)];
  }

  // concat blocks
  return [x, ..._shift(y, ...ys)];  // :on
}
