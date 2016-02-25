/* eslint no-extend-native: 0 */
import { List, Map, Iterable } from 'immutable';
import _ from 'lodash';

List.prototype.getEmptyTiles = function getEmptyTiles() {
  return this
    .map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        cell ? undefined : Map({ row: rowIndex, col: colIndex })
      ))))
    .flatten(true)
    .filter(_.identity);
};

List.prototype.toTileSet = function toTileSet() {
  return this
    .flatten(true)
    .toSet()
    .filter(_.identity);
};

Map.prototype.updateGrid = function updateGrid(col, row, isNew = undefined) {
  return this.merge(isNew === undefined ? { col, row } : { col, row, isNew });
};

List.prototype.tileValues = function tileValues() {
  return this.flatten(true)
             .map(tile => !tile ? tile : tile.get('value'));
};

Iterable.prototype.log = function log(key, msg) {
  const target = key ? this.get(key) : this;
  console.log(...(msg ? [msg, target.toJS()] : [target.toJS()])); // eslint-disable-line no-console
  return this;
};

Iterable.prototype.logIn = function logIn(path, msg) {
  const target = this.get(path);
  console.log(...(msg ? [msg, target.toJS()] : [target.toJS()])); // eslint-disable-line no-console
  return this;
};
