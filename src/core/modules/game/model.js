import { List } from 'immutable';
import { transpose, shift, tileNeighbors } from './utils';
import { INITIAL_STATE, GAME_WON_TILE } from '../../constants';

export function shiftLeft(gameState = List()) {
  return gameState.update(value => value.map(shift));
}

export function shiftUp(gameState = List()) {
  return gameState.update(value => transpose(shiftLeft(transpose(value))));
}

export function shiftRight(gameState = List()) {
  return gameState.update(value => value.map(col => shift(col.reverse()).reverse()));
}

export function shiftDown(gameState = List()) {
  return gameState.update(value => transpose(shiftRight(transpose(value))));
}

export function newGame() {
  return INITIAL_STATE.getIn(['game', 'state']);
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

      if (state.getIn(keyPath)) { return; }

      state.setIn(keyPath, tile.set('isNew', true));
    };
  }
}

export function updateTilesFromValue(gameState) {
  return gameState.map(row => row.map(updateTileFromValue));

  function updateTileFromValue(tile) {
    if (!tile) {
      return tile;
    }

    return tile.set('fromValue', tile.get('value', 0));
  }
}

export function updateTilesCoordinates(gameState) {
  return gameState.update(updater => (
    updater.map((row, rowIndex) => (
      row.map((tile, colIndex) => (
        tile ? tile.updateGrid(colIndex, rowIndex, false) : undefined
      ))
    ))
  ));
}

export function updateMeta(game) {
  return game
    .update('meta', gameMeta => (
      gameMeta.update('score', gameScore => (
        game.get('state')
            .toTileSet()
            .reduce(sumPoints, gameScore)
      ))
    ))
    .update('meta', gameMeta => (
      gameMeta.update('topScore', topScore => (
        Math.max(topScore, gameMeta.get('score'))
      ))
    ))
    .update(_game => _game.setIn(['meta', 'gameWon'], gameIsWon(_game.get('state'))))
    .update(_game => _game.setIn(['meta', 'gameOver'], gameIsOver(_game.get('state'))));

  function gameIsWon(gameState) {
    const largestTile = gameState.tileValues()
                                 .reduce((left, right) => (
                                   right ? Math.max(left, right) : left
                                 ), 0);
    return largestTile >= GAME_WON_TILE;
  }

  function gameIsOver(gameState) {
    if (gameState.getEmptyTiles().size) {return false;}

    for (const [cell, down, right] of tileNeighbors(gameState.size)) {
      const cellValue = gameState.getIn([...cell, 'value']);

      if (cellValue === gameState.getIn([...down, 'value'])) {return false;}

      if (cellValue === gameState.getIn([...right, 'value'])) {return false;}
    }

    return true;
  }

  function sumPoints(left, right) {
    if (right.get('value') === right.get('fromValue')) {
      return left;
    }

    return left + right.get('value');
  }
}
