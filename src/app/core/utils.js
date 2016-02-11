import { List, Map, fromJS } from 'immutable';
import uuid from 'node-uuid';

Map.prototype.updateGrid = function updateGrid(col, row, isNew = undefined) { // eslint-disable-line no-extend-native
  return this.merge(isNew === undefined ? { col, row } : { col, row, isNew });
};

export function tileFactory(value, col, row, id) {
  return fromJS({ value, col, row, id: id === undefined ? uuid.v4() : id });
}

List.prototype.getEmptyTiles = function getEmptyTiles() {// eslint-disable-line no-extend-native
  return this
    .map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        cell !== undefined ? undefined : Map({ row: rowIndex, col: colIndex })
      ))))
    .flatten(true)
    .filter(tile => tile !== undefined);
};

List.prototype.toTileSet = function toTileSet() {
  return this
    .flatten(true)
    .toSet()
    .filter(tile => tile !== undefined);
};
