import { fromJS, List, Stack } from 'immutable';
import uuid from 'node-uuid';
import _ from 'lodash';

export function tileFactory(value, col = 0, row = 0, id = undefined) {
  return fromJS({ value, col, row, fromValue: value, id: id || uuid.v4() });
}

export function transpose(state) {
  return state
    .asMutable()
    .update(value => value.map((col, index) => state.map(row => row.get(index))))
    .asImmutable();
}

export function shift(state = List()) {
  return state
    .update(value => _shift(undefined, value.toStack()))
    .toList()
    .setSize(state.size);

  function _shift(x, xs = Stack()) {
    // Guard last item.
    if (!xs.size) {
      return xs.withMutations(stack => stack.unshift(x));
    }

    // Guard shift undefined
    if (!x) {
      return _shift(xs.first(), xs.shift());
    }

    // Guard next is undefined
    if (!xs.first()) {
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
}

export function* tileNeighbors(size) {
  for (const x of _.range(size - 1)) {
    for (const y of _.range(size - 1)) {
      yield [[x, y], [x + 1, y], [x, y + 1]];
    }
  }

  const z = size - 1;
  yield [[z, z], [z - 1, z], [z, z - 1]];
}
