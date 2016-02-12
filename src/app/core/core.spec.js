/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { List, fromJS } from 'immutable';
import { shiftLeft, shiftUp, shiftRight, shiftDown, pushTiles } from './core';
import { expect } from 'chai';
import { tileFactory } from './utils';

const U = undefined;

describe('app core logic', () => {
  describe('shiftLeft', () => {
    it('shifts values left', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on

      const nextState = shiftLeft(state);

      const expected = fromJS([ // :off
        [U, U, U, U],
        [a, U, U, U],
        [b, U, U, U],
        [U, U, U, U],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('shifts values left', () => {
      const [a, b, c, d, e, f, g, h, i, j, k, l] = [
        tileFactory(2), tileFactory(4), tileFactory(4),

        tileFactory(8), tileFactory(8),

        tileFactory(4), tileFactory(4), tileFactory(2),

        tileFactory(4), tileFactory(4), tileFactory(4), tileFactory(4),
      ];
      const [C, E, G, J, L] = [
        c.set('value', 8), e.set('value', 16), g.set('value', 8), j.set('value', 8), l.set('value', 8),
      ];
      const state = fromJS([ // :off
        [a, b, c, U],
        [U, U, d, e],
        [U, f, g, h],
        [i, j, k, l],
      ]); // :on

      const nextState = shiftLeft(state);

      const expected = fromJS([ // :off
        [a, C, U, U],
        [E, U, U, U],
        [G, h, U, U],
        [J, L, U, U],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('shiftUp', () => {
    it('shifts values up', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on

      const nextState = shiftUp(state);

      const expected = fromJS([ // :off
        [U, U, b, a],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('shifts values up', () => {
      const [a, b, c, d, e, f, g, h, i, j, k, l] = [
        tileFactory(2), tileFactory(4), tileFactory(4),

        tileFactory(8), tileFactory(8),

        tileFactory(4), tileFactory(4), tileFactory(2),

        tileFactory(4), tileFactory(4), tileFactory(4), tileFactory(4),
      ];
      const [F, K] = [f.set('value', 8), k.set('value', 8)];
      const state = fromJS([ // :off
        [a, b, c, U],
        [U, U, d, e],
        [U, f, g, h],
        [i, j, k, l],
      ]); // :on

      const nextState = shiftUp(state);
      const expected = fromJS([ // :off
        [a, F, c, e],
        [i, j, d, h],
        [U, U, K, l],
        [U, U, U, U],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('shiftRight', () => {
    it('shifts values right', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on

      const nextState = shiftRight(state);

      const expected = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, U, b],
        [U, U, U, U],
      ]); // :on

      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('shifts values right', () => {
      const [a, b, c, d, e, f, g, h, i, j, k, l] = [
        tileFactory(2), tileFactory(4), tileFactory(4),

        tileFactory(8), tileFactory(8),

        tileFactory(4), tileFactory(4), tileFactory(2),

        tileFactory(4), tileFactory(4), tileFactory(4), tileFactory(4),
      ];
      const [B, D, F, I, K] = [
        b.set('value', 8), d.set('value', 16), f.set('value', 8), i.set('value', 8), k.set('value', 8),
      ];
      const state = fromJS([ // :off
        [a, b, c, U],
        [U, U, d, e],
        [U, f, g, h],
        [i, j, k, l],
      ]); // :on

      const nextState = shiftRight(state);

      const expected = fromJS([ // :off
        [U, U, a, B],
        [U, U, U, D],
        [U, U, F, h],
        [U, U, I, K],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('shiftDown', () => {
    it('shifts values down', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on

      const nextState = shiftDown(state);

      const expected = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, b, a],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('shifts values down', () => {
      const [a, b, c, d, e, f, g, h, i, j, k, l] = [
        tileFactory(2), tileFactory(4), tileFactory(4),

        tileFactory(8), tileFactory(8),

        tileFactory(4), tileFactory(4), tileFactory(2),

        tileFactory(4), tileFactory(4), tileFactory(4), tileFactory(4),
      ];
      const [F, G] = [f.set('value', 8), g.set('value', 8)];
      const state = fromJS([ // :off
        [a, b, c, U],
        [U, U, d, e],
        [U, f, g, h],
        [i, j, k, l],
      ]); // :on
      const nextState = shiftDown(state);

      const expected = fromJS([ // :off
        [U, U, U, U],
        [U, U, c, e],
        [a, b, d, h],
        [i, F, G, l],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('pushTiles', () => {
    it('creates a tile at coordinates', () => {
      const [a, b] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      const c = tileFactory(2, 0, 0);
      const nextState = pushTiles(List.of(c))(state);

      const C = c.set('isNew', true);
      const expected = fromJS([ // :off
        [C, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('does not override existing tiles', () => {
      const [a, b, c, d] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2), tileFactory(4, 0, 0), tileFactory(2, 0, 0)];
      const state = fromJS([ // :off
        [c, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      const tiles = List.of(d);
      const nextState = pushTiles(tiles)(state);
      const expected = fromJS([ // :off
        [c, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on

      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('creates 2 tiles', () => {
      const [a, b, c, d] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2), tileFactory(4, 0, 0), tileFactory(4, 1, 3)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      const tiles = List.of(c, d);
      const nextState = pushTiles(tiles)(state);

      const [C, D] = [c, d].map(tile => tile.set('isNew', true));
      const expected = fromJS([ // :off
        [C, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, D, U, U],
      ]); // :on
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('refreshGameTiles', () => {
  //  TODO Add tests
  });
});
