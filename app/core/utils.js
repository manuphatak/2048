import { Map, fromJS } from 'immutable';
import uuid from 'node-uuid';

Map.prototype.updateGrid = function updateGrid(col, row) { // eslint-disable-line no-extend-native
  return this.merge({ col, row });
};

export function getTiles(state) {
  return state
    .map((row, rowIndex) => row.map((value, colIndex) => {
      if (value === undefined) {
        return value;
      }
      return value.updateGrid(colIndex, rowIndex);
    }))
    .flatten(true)
    .toSet()
    .filter(x => x !== undefined);
}

export function getEmpty(state) {
  return state
    .map((row, rowIndex) => row.map((value, colIndex) => value === undefined
      ? emptyFactory(colIndex, rowIndex)
      : undefined))
    .flatten(true)
    .toSet()
    .filter(x => x !== undefined);
}

export function tileFactory(value, col, row, id) {
  return placeholderFactory(value, id).updateGrid(col, row);
}

export function placeholderFactory(value, id = undefined) {
  if (id === undefined) {
    id = uuid.v4();  // eslint-disable-line no-param-reassign
  }
  return fromJS({
    value, id,
  });
}

export function emptyFactory(col, row) {  // :off
  return Map({ col, row });  // :on
}
