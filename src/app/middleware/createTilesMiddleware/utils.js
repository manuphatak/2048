import sampleSize from 'lodash.samplesize';
import merge from 'lodash.merge';
import { handleCreateTile } from '../../actionCreators';

export function createRandomTileAction(gameState, quantity = 1) {
  // get empty tiles
  const emptyTiles = gameState.getEmptyTiles().toJS();

  // Guard, no empty tiles
  if (!emptyTiles.length) {
    return undefined;
  }

  // choose random tiles from the grid
  const randomTileSample = sampleSize(emptyTiles, Math.min(quantity, emptyTiles.length));

  // create tiles
  const newTiles = randomTileSample.map(tile => (
    merge(tile, { value: randomTileValue() })
  ));

  return handleCreateTile(newTiles);
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
