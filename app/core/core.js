import { fromJS, Stack } from 'immutable';
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
    .asImmutable();
}

export function shiftUp(state) {
  return state
    .asMutable()
    .update(value => transpose(shiftLeft(transpose(value))))
    .asImmutable();
}

export function shiftRight(state) {
  return state
    .asMutable()
    .update(value => value.map(col => shift(col.reverse()).reverse()))
    .asImmutable();
}

export function shiftDown(state) {
  return state
    .asMutable()
    .update(value => transpose(shiftRight(transpose(value))))
    .asImmutable();
}

export function shift(state) {
  return state
    .asMutable()
    .update(value => _shift(undefined, value.asImmutable().toStack()))
    .toList()
    .setSize(state.size)
    .asImmutable();
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
  return state
    .asMutable()
    .update(value => value.map((col, index) => state.map(row => row.get(index))))
    .asImmutable();
}

function _shift(x, xs) {
  // Guard last item.
  if (!xs.size) {
    return xs.withMutations(stack => stack.unshift(x));
  }

  // Guard shift undefined
  if (x === undefined) {
    return _shift(xs.first(), xs.shift());
  }

  // Guard next is undefined
  if (xs.first() === undefined) {
    return _shift(x, xs.shift());
  }

  // next
  const y = xs.first();
  const ys = xs.shift();

  // combine blocks
  if (x.get('value') === y.get('value')) {
    return _shift(ys.first(), ys.shift())
      .withMutations(stack => stack.unshift(y.update('value', v => v * 2)));
  }

  // concat blocks
  return _shift(y, ys)
    .withMutations(stack => stack.unshift(x));
}
