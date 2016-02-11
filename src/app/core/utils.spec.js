/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { List, fromJS, Set } from 'immutable';
import { getTiles, getEmpty, emptyFactory, tileFactory } from './utils';
import { expect } from 'chai';

const U = undefined;

describe('app utilities', () => {
  describe('getTiles', () => {
    it('gets tiles from state', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set([
        a.updateGrid(3, 1), b.updateGrid(2, 2),
      ]));
    });

    it('gets tiles from state', () => {
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

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set([
        a.updateGrid(0, 0),
        b.updateGrid(1, 0),
        c.updateGrid(2, 0),
        d.updateGrid(2, 1),
        e.updateGrid(3, 1),
        f.updateGrid(1, 2),
        g.updateGrid(2, 2),
        h.updateGrid(3, 2),
        i.updateGrid(0, 3),
        j.updateGrid(1, 3),
        k.updateGrid(2, 3),
        l.updateGrid(3, 3),
      ]));
    });

    it('gets no tiles from empty state', () => {
      const state = List();
      const nextState = getTiles(state);

      expect(nextState).to.equal(Set());
    });

    it('gets no tiles from state', () => {
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
      ]); // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set());
    });
  });

  describe('getEmpty', () => {
    it('creates a list of empty tiles', () => {
      const [a, b] = [tileFactory(2), tileFactory(4)];
      const state = fromJS([ // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]); // :on
      const nextState = getEmpty(state);

      expect(nextState).to.equal(Set([
        emptyFactory(0, 0),
        emptyFactory(1, 0),
        emptyFactory(2, 0),
        emptyFactory(3, 0),
        emptyFactory(0, 1),
        emptyFactory(1, 1),
        emptyFactory(2, 1),
        emptyFactory(0, 2),
        emptyFactory(1, 2),
        emptyFactory(3, 2),
        emptyFactory(0, 3),
        emptyFactory(1, 3),
        emptyFactory(2, 3),
        emptyFactory(3, 3),
      ]));
    });
  });
});
