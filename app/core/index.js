import { List, fromJS } from 'immutable';

export const INITIAL_STATE = fromJS({
  game: {
    tiles: [  // :off
      { row: 1, col: 3, value: 2 },
      { row: 2, col: 2, value: 4 },
    ],  // :on
  },
});

export function shift(state) {
  return _shift(undefined, state).setSize(state.size);
}

function _shift(x, xs) {
  if (xs.size === 0) {
    return List.of(x);
  }

  if (x === undefined) {
    return _shift(xs.first(), xs.shift().skipWhile(y => y === undefined));
  }

  if (x === xs.first()) {
    return List.of(x * 2, ..._shift(undefined, xs.shift()));
  }

  return List.of(x, ...xs.values());
}
