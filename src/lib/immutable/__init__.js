/* eslint no-extend-native: 0 */
import { List, Map, Iterable } from 'immutable';
import identity from 'lodash.identity';

List.prototype.getEmptyTiles = function getEmptyTiles() {
  return this
    .map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        cell ? undefined : Map({ row: rowIndex, col: colIndex })
      ))))
    .flatten(true)
    .filter(identity);
};

List.prototype.toTileSet = function toTileSet() {
  return this
    .flatten(true)
    .toSet()
    .filter(identity);
};

Map.prototype.updateGrid = function updateGrid(col, row, isNew = undefined) {
  return this.merge(isNew === undefined ? { col, row } : { col, row, isNew });
};

List.prototype.tileValues = function tileValues() {
  return this.flatten(true)
             .map(tile => !tile ? tile : tile.get('value'));
};

Iterable.prototype.log = function log(msg) {
  console.log(...(msg ? [msg, this.toJS()] : [this.toJS()]));
  return this;
};

export * from 'immutable';
