import { List } from 'immutable';
import { getEmpty } from '../core/utils';
import { onCreateTile } from '../actionCreators';

export function createRandomTileAction(state) {
  const nextTile = getRandomEmptyTile(state);

  if (nextTile === undefined) {
    return undefined;
  }
  return onCreateTile(2, nextTile.get('col'), nextTile.get('row'));
}

function getRandomEmptyTile(state) {
  const emptyTiles = getEmpty(state.getIn(['game', 'status'], List()));

  if (!emptyTiles.size) {
    return undefined;
  }

  return randomChoice(emptyTiles.toList());
}

function randomChoice(obj) {
  const index = Math.floor(Math.random() * obj.size);
  return obj.get(index);
}
