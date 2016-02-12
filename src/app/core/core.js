import { List } from 'immutable';
import { shift, transpose } from './utils';

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

export function pushTiles(tiles) {
  return gameState => (
    gameState.withMutations(updater => {
      tiles.forEach(pushTile(updater));
      return updater;
    })
  );

  function pushTile(state) {
    return tile => {
      const keyPath = [tile.get('row'), tile.get('col')];

      if (state.getIn(keyPath)) { return undefined; }

      state.setIn(keyPath, tile.set('isNew', true));
    };
  }
}

export function refreshGameTiles(gameState) {
  return gameState.update(updater => (
    updater.map((row, rowIndex) => (
      row.map((tile, colIndex) => (
        tile ? tile.updateGrid(colIndex, rowIndex, false) : undefined
      ))
    ))
  ));
}
