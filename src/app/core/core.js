import { List, Stack } from 'immutable';

export function shiftLeft(state = List()) {
  return state.update(value => value.map(shift));
}

export function shiftUp(state = List()) {
  return state.update(value => transpose(shiftLeft(transpose(value))));
}

export function shiftRight(state = List()) {
  return state.update(value => value.map(col => shift(col.reverse()).reverse()));
}

export function shiftDown(state = List()) {
  return state.update(value => transpose(shiftRight(transpose(value))));
}

export function shift(state = List()) {
  return state
    .update(value => _shift(undefined, value.toStack()))
    .toList()
    .setSize(state.size);
}

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

const pushTile = state => tile => {
  const keyPath = [tile.get('row'), tile.get('col')];

  if (state.getIn(keyPath)) { return undefined; }

  state.setIn(keyPath, tile.set('isNew', true));
};

export const pushTiles = tiles => gameState => (
  gameState.withMutations(updater => {
    tiles.forEach(pushTile(updater));
    return updater;
  })
);

export function refreshGameTiles(gameState) {
  return gameState.update(updater => (
    updater.map((row, rowIndex) => (
      row.map((tile, colIndex) => (
        tile ? tile.updateGrid(colIndex, rowIndex, false) : undefined
      ))
    ))
  ));
}

export function transpose(state) {
  return state
    .asMutable()
    .update(value => value.map((col, index) => state.map(row => row.get(index))))
    .asImmutable();
}
