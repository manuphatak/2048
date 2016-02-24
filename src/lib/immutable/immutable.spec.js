/* eslint-env jasmine */
/* global describe, it */

import { tileFactory } from '../../core/modules/game/utils';
import { List, fromJS, Set } from 'immutable';

const U = undefined;

describe('Immutable patch', () => {
  describe('updateGrid', () => {
    it('updates grid coordinates', () => {
      expect(tileFactory(2, 3, 1, 1).updateGrid(2, 2))
        .toEqualImmutable(tileFactory(2, 2, 2, 1));
    });
    it('it sets isNew with optional argument', () => {
      expect(tileFactory(2, 3, 1, 1).updateGrid(2, 2, true))
        .toEqualImmutable(tileFactory(2, 2, 2, 1).set('isNew', true));
    });
  });

  describe('toTileSet', () => {
    it('gets tiles from gameState', () => {
      const [a, b] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on

      const nextState = state.toTileSet();

      const expected = Set.of(a, b);
      expect(nextState).toEqualImmutable(expected);
    });

    it('gets all tiles from gameState', () => {
      const [a, b, c, d, e, f, g, h, i, j, k, l] = [
        tileFactory(2), tileFactory(4), tileFactory(4),

        tileFactory(8), tileFactory(8),

        tileFactory(4), tileFactory(4), tileFactory(2),

        tileFactory(4), tileFactory(4), tileFactory(4), tileFactory(4),
      ];
      const state = fromJS([ // :off
        [a, b, c, U],
        [U, U, d, e],
        [U, f, g, h],
        [i, j, k, l],
      ]); // :on

      const nextState = state.toTileSet();

      expect(nextState).toEqualImmutable(Set([
        a, b, c, d, e, f, g, h, i, j, k, l,
      ]));
    });

    it('gets no tiles from empty state', () => {
      expect(List().toTileSet()).toEqualImmutable(Set());
    });

    it('gets no tiles from initial state', () => {
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
      ]); // :on

      expect(state.toTileSet()).toEqualImmutable(Set());
    });
  });

  describe('getEmptyTiles', () => {
    it('creates a list of empty tiles', () => {
      const [a, b] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      const nextState = state.getEmptyTiles();

      const expected = fromJS([ // :off
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 2, row: 0 },
        { col: 3, row: 0 },
        { col: 0, row: 1 },
        { col: 1, row: 1 },
        { col: 2, row: 1 },
        { col: 0, row: 2 },
        { col: 1, row: 2 },
        { col: 3, row: 2 },
        { col: 0, row: 3 },
        { col: 1, row: 3 },
        { col: 2, row: 3 },
        { col: 3, row: 3 },
      ]); // :on

      expect(nextState).toEqualImmutable(expected);
    });
  });

  describe('tileValues', () => {
    it('gets a list of tile values', () => {
      const [a, b] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      const nextState = state.tileValues();

      const expected = fromJS([ // :off
        U, U, U, U,
        U, U, U, 2,
        U, U, 4, U,
        U, U, U, U,
      ]); // :on

      expect(nextState).toEqualImmutable(expected);
    });
  });
});
