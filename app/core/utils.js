import { Map } from 'immutable';
export function getTiles(state) {
  return state
    .map((row, rowIndex) => row.map((value, colIndex) => {
      if (value === undefined) {
        return value;
      }
      return tileFactory(value, colIndex, rowIndex);
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

export function tileFactory(value, col, row) {  // :off
  return Map({ value, col, row });  // :on
}
export function emptyFactory(col, row) {  // :off
  return Map({ col, row });  // :on
}
