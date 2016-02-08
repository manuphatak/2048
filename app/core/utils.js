import { Map, fromJS } from 'immutable';
import uuid from 'node-uuid';

export function getTiles(state) {
  return state
    .map((row, rowIndex) => row.map((value, colIndex) => {
      if (value === undefined) {
        return value;
      }
      return value.merge({
        row: rowIndex,
        col: colIndex,
      });
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

export function tileFactory(value, col, row, id) {  // :off
  return placeholderFactory(value, id).merge({ col, row });  // :on
}

export function placeholderFactory(value, id = undefined) {
  if (id === undefined) {
    id = uuid.v4();  // eslint-disable-line no-param-reassign
  }
  return fromJS({
    value,
    id,
  });
}

export function emptyFactory(col, row) {  // :off
  return Map({ col, row });  // :on
}
