/* eslint no-extend-native: 0 */
import * as Immutable from 'immutable';
import * as identity from 'lodash.identity';
const { List, Map, Iterable } = Immutable;

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

Iterable.prototype.log = function log(key, msg) {
  const target = key ? this.get(key) : this;
  console.log(...(msg ? [ msg, target.toJS() ] : [ target.toJS() ])); // eslint-disable-line no-console
  return this;
};

Iterable.prototype.logIn = function logIn(path, msg) {
  const target = this.get(path);
  console.log(...(msg ? [ msg, target.toJS() ] : [ target.toJS() ])); // eslint-disable-line no-console
  return this;
};

export * from 'immutable';
