import sampleSize from 'lodash.samplesize';
import { onCreateTile } from '../actionCreators';

export function createRandomTileAction(state, quantity = 1) {
  const emptyTiles = state.getIn(['game', 'state'])
                          .map((row, rowIndex) => (
                            row.map((cell, colIndex) => (
                              cell !== undefined ? undefined : { row: rowIndex, col: colIndex }
                            ))
                          ))
                          .flatten(true)
                          .filter(tile => tile !== undefined)
                          .toJS();
  if (!emptyTiles.length) {
    return undefined;
  }

  const nextTile = sampleSize(emptyTiles, Math.min(quantity, emptyTiles.length));

  if (nextTile === undefined) {
    return undefined;
  }
  return onCreateTile(nextTile.map(tile => Object.assign({}, tile, { value: randomTileValue() })));
}

function randomTileValue() {
  const random = Math.random();
  if (random >= 0.95) {return 8;}
  if (random >= 0.70) {return 4;}
  return 2;
}

export function randomTileQuantity() {
  return Math.random() > 0.75 ? 3 : 2;
}
