import { Map, List, Set } from 'immutable';
import { placeholderFactory } from './utils';

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
// TODO create many
export function createTiles(state, tiles) {
  return createTile(state, tiles.get(0));
}

function createTile(state, tile) {
  return state.updateIn([  // :off
    tile.get('row'),
    tile.get('col'),
  ],
    undefined,
    v => v === undefined
      ? placeholderFactory(tile.get('value'), tile.get('id'))
      : v); // :on
}
export function updateGameTiles(game) {
  return game.update('tiles', Set(), tiles => updateTiles(tiles, game.get('status')));
}

function updateTiles(tiles, status) {
  return Map(status
    .map((row, rowIndex) => row.map((tile, colIndex) => {
      if (tile === undefined) {
        return undefined;
      }
      return List.of(tile.get('id'), tile.updateGrid(colIndex, rowIndex)
                                         .set('isNew', false));
    }))
    .flatten(true))
    .map((nextTile, key) => {
      const oldTile = tiles.get(key, undefined);
      if (oldTile === undefined) {
        return nextTile.delete('from');
      }

      return nextTile.update('from', () => oldTile);
    });
}

// TODO add many tiles
export function addGameTiles(payload, game) {
  const newTile = game.getIn(['status', payload.get('row'), payload.get('col')])
                      .updateGrid(payload.get('col'), payload.get('row'))
                      .set('isNew', true);
  return game.update('tiles', Set(), tiles => tiles.set(newTile.get('id'), newTile));
}

export function transpose(state) {
  return state
    .asMutable()
    .update(value => value.map((col, index) => state.map(row => row.get(index))))
    .asImmutable();
}
