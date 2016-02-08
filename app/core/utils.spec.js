/* global describe, it */
import { List, fromJS, Set } from 'immutable';
import { getTiles, tileFactory, getEmpty, emptyFactory } from './utils';
import { expect } from 'chai';

const U = undefined; // eslint-disable-line id-length

describe('app utils', () => {
  describe('getTiles', () => {
    it('gets tiles from state', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set([
        tileFactory(2, 3, 1),
        tileFactory(4, 2, 2),
      ]));
    });

    it('gets tiles from state', () => {
      const state = fromJS([  // :off
        [2, 4, 4, U],
        [U, U, 8, 8],
        [U, 4, 4, 2],
        [4, 4, 4, 4],
      ]);  // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(Set([
        tileFactory(2, 0, 0),
        tileFactory(4, 1, 0),
        tileFactory(4, 2, 0),
        tileFactory(8, 2, 1),
        tileFactory(8, 3, 1),
        tileFactory(4, 1, 2),
        tileFactory(4, 2, 2),
        tileFactory(2, 3, 2),
        tileFactory(4, 0, 3),
        tileFactory(4, 1, 3),
        tileFactory(4, 2, 3),
        tileFactory(4, 3, 3),
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
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
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
