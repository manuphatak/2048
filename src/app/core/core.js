import { Map, List, Set } from 'immutable';
import { tileFactory } from './utils';

export function shiftLeft(state) {
  return state
    .update(value => value.map(col => shift(col)));
}

export function shiftUp(state) {
  return state
    .update(value => transpose(shiftLeft(transpose(value))));
}

export function shiftRight(state) {
  return state
    .update(value => value.map(col => shift(col.reverse()).reverse()));
}

export function shiftDown(state) {
  return state
    .update(value => transpose(shiftRight(transpose(value))));
}

export function shift(state) {
  return state
    .update(value => _shift(undefined, value.asImmutable().toStack()))
    .toList()
    .setSize(state.size);
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

const createTile = state => tile => {
  const keyPath = [tile.get('row'), tile.get('col')];

  if (state.getIn(keyPath, undefined) !== undefined) { return undefined; }

  state.setIn(keyPath, tile.set('isNew', true));
};

export function createTiles(state, tiles) {
  return state.withMutations(updater => {
    tiles.forEach(createTile(updater));
    return updater;
  });
}

export function refreshGameTiles(game) {
  return game.update('state', List(), updater => (
    updater.map((row, rowIndex) => (
      row.map((tile, colIndex) => {
        if (tile === undefined) {return undefined;}

        return tile.updateGrid(colIndex, rowIndex, false);
      })
    ))
  ));
}

export function transpose(state) {
  return state
    .asMutable()
    .update(value => value.map((col, index) => state.map(row => row.get(index))))
    .asImmutable();
}
