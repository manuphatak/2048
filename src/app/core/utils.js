import { List, Map, fromJS } from 'immutable';
import uuid from 'node-uuid';

Map.prototype.updateGrid = function updateGrid(col, row, isNew = undefined) { // eslint-disable-line no-extend-native

  return this.merge(isNew === undefined ? { col, row } : { col, row, isNew });
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

export function getEmpty(state = List()) {
  return state
    .map((row, rowIndex) => row.map((value, colIndex) => value === undefined
      ? emptyFactory(colIndex, rowIndex)
      : undefined))
    .flatten(true)
    .toSet()
    .filter(x => x !== undefined);
}

export function tileFactory(value, col, row, id) {
  return fromJS({ value, col, row, id: id === undefined ? uuid.v4() : id });
}

// export function placeholderFactory(value, id = undefined) {
//   if (id === undefined) {
//     id = uuid.v4();  // eslint-disable-line no-param-reassign
//   }
//   return fromJS({
//     value, id,
//   });
// }

export function emptyFactory(col, row) { // :off
  return Map({ col, row }); // :on
}
