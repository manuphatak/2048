/* eslint-env jasmine */
/* global describe, it */
import { tileFactory, shift, transpose } from './utils';
import { fromJS, List } from 'immutable';

const U = undefined;

describe('app utilities', () => {
  describe('tileFactory', () => {
    it('creates a tile', () => {
      expect(tileFactory(2, 0, 0, 1)).toEqualImmutable(fromJS({ value: 2, fromValue: 2, col: 0, row: 0, id: 1 }));
    });
  });

  describe('shift', () => {
    it('shifts a number to the left', () => {
      const a = tileFactory(2);
      const state = List.of(U, U, a, U);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(a, U, U, U));
    });

    it('shifts all numbers to the left', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = List.of(U, a, U, b);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(a, b, U, U));
    });

    it('combines like numbers', () => {
      const [a, b] = [tileFactory(2), tileFactory(2)];
      const state = List.of(a, b, U, U);
      const nextState = shift(state);
      expect(nextState).toEqualImmutable(List.of(b.set('value', 4), U, U, U));
    });

    it('combines like numbers even when separated', () => {
      const [a, b] = [tileFactory(2), tileFactory(2)];
      const state = List.of(a, U, b, U);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(b.set('value', 4), U, U, U));
    });

    it('does not aggressively combine numbers', () => {
      const [a, b, c] = [tileFactory(2), tileFactory(2), tileFactory(4)];
      const state = List.of(a, b, c, U);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(b.set('value', 4), c, U, U));
    });

    it('combines pairs', () => {
      const [a, b, c, d] = [tileFactory(2), tileFactory(2), tileFactory(2), tileFactory(2)];
      const [B, D] = [b.set('value', 4), d.set('value', 4)];
      const state = List.of(a, b, c, d);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(B, D, U, U));
    });

    it('combines pairs with different values', () => {
      const [a, b, c, d] = [tileFactory(2), tileFactory(2), tileFactory(4), tileFactory(4)];
      const [B, D] = [b.set('value', 4), d.set('value', 8)];
      const state = List.of(a, b, c, d);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(B, D, U, U));
    });

    it('handles empty values', () => {
      const state = List.of(U, U, U, U);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(U, U, U, U));
    });

    it('finds separated pairs', () => {
      const [a, b, c] = [tileFactory(4), tileFactory(4), tileFactory(4)];
      const B = b.set('value', 8);
      const state = List.of(a, U, b, c);
      const nextState = shift(state);

      expect(nextState).toEqualImmutable(List.of(B, c, U, U));
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

      expect(nextState).toEqualImmutable(fromJS([ // :off
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
      expect(nextState).toEqualImmutable(state);

      const oddState = transpose(transpose(transpose(state)));
      expect(oddState).toEqualImmutable(transpose(state));
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

      expect(nextState).toEqualImmutable(fromJS([ // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, r, U],
        [U, q, U, U],
      ])); // :on

      expect(transpose(nextState)).toEqualImmutable(state);
    });
  });
});
