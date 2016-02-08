import { List, fromJS } from 'immutable';
import { placeholderFactory } from './utils';

const [U, A, B] = [
  undefined,
  placeholderFactory(2),
  placeholderFactory(4),
];

export const INITIAL_STATE = fromJS({
  game: {
    status: fromJS([  // :off
          [U, U, U, U],
          [U, U, U, A],
          [U, U, B, U],
          [U, U, U, U],
    ]), // :on
  },
});

export function shiftLeft(state) {
  return state
    .asMutable()
    .update(value => value.map(col => shift(col)))
    .asMutable();
}

export function shiftUp(state) {
  return state
    .asMutable()
    .update(value => transpose(shiftLeft(transpose(value))))
    .asMutable();
}

export function shiftRight(state) {
  return state
    .asMutable()
    .update(value => value.map(col => shift(col.reverse()).reverse()))
    .asMutable();
}

export function shiftDown(state) {
  return state
    .asMutable()
    .update(value => transpose(shiftRight(transpose(value))))
    .asMutable();
}

export function shift(state) {
  return List(_shift(...state.values())).setSize(state.size);
}

export function createTile(state, tile) {
  return state.updateIn([  // :off
    tile.get('row'),
    tile.get('col'),
  ],  // :on
    undefined,
    v => v === undefined
      ? placeholderFactory(tile.get('value'), tile.get('id', undefined))
      : v);
}

export function transpose(state) {
  return state.map((col, index) => state.map(row => row.get(index)));
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
  if (y !== undefined && x.get('value') === y.get('value')) {
    return [
      y.update('value', v => v * 2),
      ..._shift(...ys),
    ];
  }

  // concat blocks
  return [
    x,
    ..._shift(y, ...ys),
  ];
}
