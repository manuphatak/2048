import { List, Map } from 'immutable';

List.prototype.getEmptyTiles = function getEmptyTiles() {// eslint-disable-line no-extend-native
  return this
    .map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        cell ? undefined : Map({ row: rowIndex, col: colIndex })
      ))))
    .flatten(true)
    .filter(tile => !!tile);
};

List.prototype.toTileSet = function toTileSet() {
  return this
    .flatten(true)
    .toSet()
    .filter(tile => !!tile);
};

Map.prototype.updateGrid = function updateGrid(col, row, isNew = undefined) { // eslint-disable-line no-extend-native
  return this.merge(isNew === undefined ? { col, row } : { col, row, isNew });
};

export * from 'immutable';
