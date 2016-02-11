/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { List, fromJS, Map } from 'immutable';
import {
  shift, transpose, shiftLeft, shiftUp, shiftRight, shiftDown, pushTiles,refreshGameTiles,
} from './core';
import { expect } from 'chai';
import { tileFactory } from './utils';

const U = undefined;

describe('app core logic', () => {
  describe('shift', () => {
    it('shifts a number to the left', () => {
      const a = tileFactory(2);
      const state = List.of(U, U, a, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(a, U, U, U));
    });

    it('shifts all numbers to the left', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = List.of(U, a, U, b);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(a, b, U, U));
    });

    it('combines like numbers', () => {
      const [a, b] = [tileFactory(2), tileFactory(2)];
      const state = List.of(a, b, U, U);
      const nextState = shift(state);
      expect(nextState).to.equal(List.of(b.set('value', 4), U, U, U));
    });

    it('combines like numbers even when separated', () => {
      const [a, b] = [tileFactory(2), tileFactory(2)];
      const state = List.of(a, U, b, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(b.set('value', 4), U, U, U));
    });

    it('does not aggressively combine numbers', () => {
      const [a, b, c] = [tileFactory(2), tileFactory(2), tileFactory(4)];
      const state = List.of(a, b, c, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(b.set('value', 4), c, U, U));
    });

    it('combines pairs', () => {
      const [a, b, c, d] = [tileFactory(2), tileFactory(2), tileFactory(2), tileFactory(2)];
      const [B, D] = [b.set('value', 4), d.set('value', 4)];
      const state = List.of(a, b, c, d);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(B, D, U, U));
    });

    it('combines pairs with different values', () => {
      const [a, b, c, d] = [tileFactory(2), tileFactory(2), tileFactory(4), tileFactory(4)];
      const [B, D] = [b.set('value', 4), d.set('value', 8)];
      const state = List.of(a, b, c, d);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(B, D, U, U));
    });

    it('handles empty values', () => {
      const state = List.of(U, U, U, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(U, U, U, U));
    });

    it('finds separated pairs', () => {
      const [a, b, c] = [tileFactory(4), tileFactory(4), tileFactory(4)];
      const B = b.set('value', 8);
      const state = List.of(a, U, b, c);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(B, c, U, U));
    });
  });

  describe('transpose', () => {
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = [
      tileFactory(2), tileFactory(4), tileFactory(8), tileFactory(16),

      tileFactory(32), tileFactory(64), tileFactory(128), tileFactory(256),

      tileFactory(512), tileFactory(1024), tileFactory(2048), tileFactory(3),

      tileFactory(5), tileFactory(7), tileFactory(9), tileFactory(11),
    ];
    it('gets columns from a list of rows', () => {
      const state = fromJS([ // :off
        [a, b, c, d],
        [e, f, g, h],
        [i, j, k, l],
        [m, n, o, p],
      ]); // :on
      const nextState = transpose(state);

      expect(nextState).to.equal(fromJS([ // :off
        [a, e, i, m],
        [b, f, j, n],
        [c, g, k, o],
        [d, h, l, p],
      ])); // :on
    });

    it('has some sanity', () => {
      const state = fromJS([ // :off
        [a, b, c, d],
        [e, f, g, h],
        [i, j, k, l],
        [m, n, o, p],
      ]); // :on

      const nextState = transpose(transpose(state));
      expect(nextState).to.equal(state);

      const oddState = transpose(transpose(transpose(state)));
      expect(oddState).to.equal(transpose(state));
    });

    it('can handle undefined values', () => {
      const [q, r] = [tileFactory(2), tileFactory(4)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, q],
        [U, U, r, U],
        [U, U, U, U],
      ]); // :on

      const nextState = transpose(state);

      expect(nextState).to.equal(fromJS([ // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, r, U],
        [U, q, U, U],
      ])); // :on

      expect(transpose(nextState)).to.equal(state);
    });
  });

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
});
