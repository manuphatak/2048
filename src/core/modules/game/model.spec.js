/* eslint-env jasmine */
/* global describe, it */
import { List, fromJS } from 'immutable';
import {
  shiftLeft, shiftUp, shiftRight, shiftDown, pushTiles, updateTilesCoordinates, updateTilesFromValue, updateMeta,
} from './model';
import { tileFactory } from './utils';

const U = undefined;

describe('GAME MODEL', () => {
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
      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
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

      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
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

      expect(nextState).toEqualImmutable(expected);
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
      expect(nextState).toEqualImmutable(expected);
    });
  });

  describe('updateTilesCoordinates', () => {
    it('updates coordinates based on location', () => {
      const [a, b] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2)];
      const [A, B] = [a.updateGrid(0, 1, false), b.updateGrid(0, 2, false)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [a, U, U, U],
        [b, U, U, U],
        [U, U, U, U],
      ]); // :on
      const nextState = updateTilesCoordinates(state);
      const expected = fromJS([ // :off
        [U, U, U, U],
        [A, U, U, U],
        [B, U, U, U],
        [U, U, U, U],
      ]); // :on

      expect(nextState).toEqualImmutable(expected);
    });
  });

  describe('updateTilesFromValue', () => {
    it('syncs fromValue with current value', () => {
      const [a, b] = [tileFactory(4, 3, 1).set('fromValue', 2), tileFactory(4, 2, 2).set('fromValue', 4)];
      const [A, B] = [a.set('fromValue', 4), b];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      const nextState = updateTilesFromValue(state);
      const expected = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, A],
        [U, U, B, U],
        [U, U, U, U],
      ]); // :on

      expect(nextState).toEqualImmutable(expected);
    });
  });

  describe('updateMeta', () => {
    it('adds 0 points when nothing changes', () => {
      const [a, b] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2)];
      const state = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ],  // :on

        meta: { score: 0, topScore: 0, gameWon: false, gameOver: false },
      });
      const nextState = updateMeta(state);

      expect(nextState).toEqualImmutable(state);
    });

    it('adds points for combined tiles', () => {
      const [a, b] = [
        tileFactory(4, 3, 1).set('fromValue', 2), tileFactory(8, 2, 2).set('fromValue', 4),
      ];
      const state = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ],  // :on

        meta: { score: 0, topScore: 4 },
      });
      const nextState = updateMeta(state);

      const expected = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ],  // :on

        meta: { score: 12, topScore: 12, gameWon: false, gameOver: false },
      });

      expect(nextState).toEqualImmutable(expected);
    });

    it('does not update top score when current score is lower', () => {
      const [a, b] = [
        tileFactory(4, 3, 1).set('fromValue', 2), tileFactory(8, 2, 2).set('fromValue', 4),
      ];
      const state = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ],  // :on

        meta: { score: 4, topScore: 22, gameWon: false },
      });
      const nextState = updateMeta(state);

      const expected = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ],  // :on

        meta: { score: 16, topScore: 22, gameWon: false, gameOver: false },
      });

      expect(nextState).toEqualImmutable(expected);
    });

    describe('gameWon', () => {
      it('sets gameWon to true when a 2048 is on the board', () => {
        const [a, b] = [tileFactory(2048, 3, 1), tileFactory(4, 2, 2)];
        const state = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ],  // :on

          meta: { score: 0, topScore: 0, gameWon: false },
        });
        const nextState = updateMeta(state);
        const expected = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ],  // :on

          meta: { score: 0, topScore: 0, gameWon: true, gameOver: false },
        });

        expect(nextState).toEqualImmutable(expected);
      });
      it('gameWon stays true for larger tiles', () => {
        const a = tileFactory(4096, 3, 1);
        const state = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, U, U],
            [U, U, U, U],
          ],  // :on

          meta: { score: 0, topScore: 0, gameWon: true },
        });
        const nextState = updateMeta(state);
        const expected = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, U, U],
            [U, U, U, U],
          ],  // :on

          meta: { score: 0, topScore: 0, gameWon: true, gameOver: false },
        });

        expect(nextState).toEqualImmutable(expected);
      });
    });

    describe('gameOver', () => {
      it('sets gameOver to true when no more tiles can move', () => {
        const [a, b, c, d] = [
          tileFactory(2, 0, 0), tileFactory(4, 1, 0), tileFactory(128, 2, 0), tileFactory(64, 3, 0),
        ];
        const [e, f, g, h] = [
          tileFactory(32, 0, 1), tileFactory(128, 1, 1), tileFactory(32, 2, 1), tileFactory(16, 3, 1),
        ];
        const [i, j, k, l] = [
          tileFactory(8, 0, 2), tileFactory(16, 1, 2), tileFactory(64, 2, 2), tileFactory(4, 3, 2),
        ];
        const [m, n, o, p] = [
          tileFactory(4, 0, 3), tileFactory(8, 1, 3), tileFactory(4, 2, 3), tileFactory(2, 3, 3),
        ];
        const state = fromJS({
          state: [ // :off
            [a, b, c, d],
            [e, f, g, h],
            [i, j, k, l],
            [m, n, o, p],
          ],  // :on

          meta: { score: 2280, topScore: 2280, gameWon: false },
        });
        const nextState = updateMeta(state);
        const expected = fromJS({

          state: [ // :off
            [a, b, c, d],
            [e, f, g, h],
            [i, j, k, l],
            [m, n, o, p],
          ],  // :on

          meta: { score: 2280, topScore: 2280, gameWon: false, gameOver: true },
        });

        expect(nextState).toEqualImmutable(expected);
      });

      it('does not set gameOver to true when there are moves available', () => {
        const [a, b, c, d] = [
          tileFactory(2, 0, 0), tileFactory(4, 1, 0), tileFactory(128, 2, 0), tileFactory(64, 3, 0),
        ];
        const [e, f, g, h] = [
          tileFactory(32, 0, 1), tileFactory(128, 1, 1), tileFactory(32, 2, 1), tileFactory(16, 3, 1),
        ];
        const [i, j, k, l] = [
          tileFactory(8, 0, 2), tileFactory(16, 1, 2), tileFactory(64, 2, 2), tileFactory(4, 3, 2),
        ];
        const [m, n, o, p] = [
          tileFactory(4, 0, 3), tileFactory(8, 1, 3), tileFactory(2, 2, 3), tileFactory(2, 3, 3),
        ];
        const state = fromJS({
          state: [ // :off
            [a, b, c, d],
            [e, f, g, h],
            [i, j, k, l],
            [m, n, o, p],
          ],  // :on

          meta: { score: 2280, topScore: 2280, gameWon: false },
        });
        const nextState = updateMeta(state);
        const expected = fromJS({

          state: [ // :off
            [a, b, c, d],
            [e, f, g, h],
            [i, j, k, l],
            [m, n, o, p],
          ],  // :on

          meta: { score: 2280, topScore: 2280, gameWon: false, gameOver: false },
        });

        expect(nextState).toEqualImmutable(expected);
      });
    });
  });
});
