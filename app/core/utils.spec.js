/* global describe, it */
import { List, fromJS, Set } from 'immutable';
import { getTiles, tileFactory, getEmpty, emptyFactory, placeholderFactory } from './utils';
import { expect } from 'chai';

const U = undefined; // eslint-disable-line id-length

describe('app utilities', () => {
  describe('getTiles', () => {
    it('gets tiles from state', () => {
      const [a, b] = [
        placeholderFactory(2),
        placeholderFactory(4),
      ];
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set([
        tileFactory(a.get('value'), 3, 1, a.get('id')),
        tileFactory(b.get('value'), 2, 2, b.get('id')),
      ]));
    });

    it('gets tiles from state', () => {
      const [a, b, c, d, e, f, g, h, i, j, k, l] = [
        placeholderFactory(2),
        placeholderFactory(4),
        placeholderFactory(4),

        placeholderFactory(8),
        placeholderFactory(8),

        placeholderFactory(4),
        placeholderFactory(4),
        placeholderFactory(2),

        placeholderFactory(4),
        placeholderFactory(4),
        placeholderFactory(4),
        placeholderFactory(4),
      ];
      const state = fromJS([  // :off
        [a, b, c, U],
        [U, U, d, e],
        [U, f, g, h],
        [i, j, k, l],
      ]);  // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set([
        tileFactory(a.get('value'), 0, 0, a.get('id')),
        tileFactory(b.get('value'), 1, 0, b.get('id')),
        tileFactory(c.get('value'), 2, 0, c.get('id')),
        tileFactory(d.get('value'), 2, 1, d.get('id')),
        tileFactory(e.get('value'), 3, 1, e.get('id')),
        tileFactory(f.get('value'), 1, 2, f.get('id')),
        tileFactory(g.get('value'), 2, 2, g.get('id')),
        tileFactory(h.get('value'), 3, 2, h.get('id')),
        tileFactory(i.get('value'), 0, 3, i.get('id')),
        tileFactory(j.get('value'), 1, 3, j.get('id')),
        tileFactory(k.get('value'), 2, 3, k.get('id')),
        tileFactory(l.get('value'), 3, 3, l.get('id')),
      ]));
    });

    it('gets no tiles from empty state', () => {
      const state = List();

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set());
    });

    it('gets no tiles from state', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set());
    });
  });

  describe('getEmpty', () => {
    it('creates a list of empty tiles', () => {
      const [a, b] = [
        placeholderFactory(2),
        placeholderFactory(4),
      ];
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, a],
        [U, U, b, U],
        [U, U, U, U],
      ]);  // :on
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
