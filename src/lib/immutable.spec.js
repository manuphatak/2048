/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { List, fromJS, Set } from './immutable';
import { tileFactory } from '../app/core/utils';
import { expect } from 'chai';

const U = undefined;

describe('Immutable patch', () => {
  describe('updateGrid', () => {
    it('updates grid coordinates', () => {
      expect(tileFactory(2, 3, 1, 1).updateGrid(2, 2))
        .to.equal(tileFactory(2, 2, 2, 1));
    });
    it('it sets isNew with optional argument', () => {
      expect(tileFactory(2, 3, 1, 1).updateGrid(2, 2, true))
        .to.equal(tileFactory(2, 2, 2, 1).set('isNew', true));
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
      expect(nextState).to.equal(expected);
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

      expect(nextState).to.equal(Set([
        a, b, c, d, e, f, g, h, i, j, k, l,
      ]));
    });

    it('gets no tiles from empty state', () => {
      expect(List().toTileSet()).to.equal(Set());
    });

    it('gets no tiles from initial state', () => {
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
      ]); // :on

      expect(state.toTileSet()).to.equal(Set());
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

      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });
});
