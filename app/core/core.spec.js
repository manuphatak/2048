/* global describe, it */
import { List, fromJS } from 'immutable';
import { shift, transpose, shiftLeft, shiftUp, shiftRight, shiftDown, getTiles, tileFactory } from './index';
import { expect } from 'chai';

const U = undefined; // eslint-disable-line id-length

describe('app core logic', () => {
  describe('shift', () => {
    it('shifts a number to the left', () => {
      const state = List.of(U, U, 2, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(2, U, U, U));
    });

    it('shifts all numbers to the left', () => {
      const state = List.of(U, 2, U, 4);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(2, 4, U, U));
    });

    it('combines like numbers', () => {
      const state = List.of(2, 2, U, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, U, U, U));
    });

    it('combines like numbers even when separated', () => {
      const state = List.of(2, U, 2, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, U, U, U));
    });

    it('does not aggressively combine numbers', () => {
      const state = List.of(2, 2, 4, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, 4, U, U));
    });

    it('combines pairs', () => {
      const state = List.of(2, 2, 2, 2);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, 4, U, U));
    });

    it('combines pairs with different values', () => {
      const state = List.of(2, 2, 4, 4);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, 8, U, U));
    });

    it('handles empty values', () => {
      const state = List.of(U, U, U, U);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(U, U, U, U));
    });

    it('finds seperated pairs', () => {
      const state = List.of(4, U, 4, 4);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(8, 4, U, U));
    });
  });

  describe('transpose', () => {
    it('gets columns from a list of rows', () => {
      const state = fromJS([  // :off
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 0, 1, 2],
        [3, 4, 5, 6],
      ]);  // :on
      const nextState = transpose(state);

      expect(nextState).to.equal(fromJS([  // :off
        [1, 5, 9, 3],
        [2, 6, 0, 4],
        [3, 7, 1, 5],
        [4, 8, 2, 6],
      ]));  // :on
    });

    it('has some sanity', () => {
      const state = fromJS([  // :off
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 0, 1, 2],
        [3, 4, 5, 6],
      ]);  // :on

      const nextState = transpose(transpose(state));
      expect(nextState).to.equal(state);

      const oddState = transpose(transpose(transpose(state)));
      expect(oddState).to.equal(transpose(state));
    });

    it('can handle U values', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = transpose(state);

      expect(nextState).to.equal(fromJS([  // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, 4, U],
        [U, 2, U, U],
      ]));  // :on

      expect(transpose(nextState)).to.equal(state);
    });
  });

  describe('shiftLeft', () => {
    it('shifts values left', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = shiftLeft(state);

      expect(nextState).to.equal(fromJS([  // :off
        [U, U, U, U],
        [2, U, U, U],
        [4, U, U, U],
        [U, U, U, U],
      ]));  // :on
    });

    it('shifts values left', () => {
      const state = fromJS([  // :off
        [2, 4, 4, U],
        [U, U, 8, 8],
        [U, 4, 4, 2],
        [4, 4, 4, 4],
      ]);  // :on

      const nextState = shiftLeft(state);

      expect(nextState).to.equal(fromJS([  // :off
        [2, 8, U, U],
        [16, U, U, U],
        [8, 2, U, U],
        [8, 8, U, U],
      ]));  // :on
    });
  });

  describe('shiftUp', () => {
    it('shifts values up', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = shiftUp(state);

      expect(nextState).to.equal(fromJS([  // :off
        [U, U, 4, 2],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
      ]));  // :on
    });

    it('shifts values up', () => {
      const state = fromJS([  // :off
        [2, 4, 4, U],
        [U, U, 8, 8],
        [U, 4, 4, 2],
        [4, 4, 4, 4],
      ]);  // :on

      const nextState = shiftUp(state);

      expect(nextState).to.equal(fromJS([  // :off
        [2, 8, 4, 8],
        [4, 4, 8, 2],
        [U, U, 8, 4],
        [U, U, U, U],
      ]));  // :on
    });
  });

  describe('shiftRight', () => {
    it('shifts values right', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = shiftRight(state);

      expect(nextState).to.equal(fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, U, 4],
        [U, U, U, U],
      ]));  // :on
    });

    it('shifts values right', () => {
      const state = fromJS([  // :off
        [2, 4, 4, U],
        [U, U, 8, 8],
        [U, 4, 4, 2],
        [4, 4, 4, 4],
      ]);  // :on

      const nextState = shiftRight(state);

      expect(nextState).to.equal(fromJS([  // :off
        [U, U, 2, 8],
        [U, U, U, 16],
        [U, U, 8, 2],
        [U, U, 8, 8],
      ]));  // :on
    });
  });

  describe('shiftDown', () => {
    it('shifts values down', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = shiftDown(state);

      expect(nextState).to.equal(fromJS([  // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, 4, 2],
      ]));  // :on
    });

    it('shifts values down', () => {
      const state = fromJS([  // :off
        [2, 4, 4, U],
        [U, U, 8, 8],
        [U, 4, 4, 2],
        [4, 4, 4, 4],
      ]);  // :on

      const nextState = shiftDown(state);

      expect(nextState).to.equal(fromJS([  // :off
        [U, U, U, U],
        [U, U, 4, 8],
        [2, 4, 8, 2],
        [4, 8, 8, 4],
      ]));  // :on
    });
  });

  describe('getTiles', () => {
    it('gets tiles from state', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, 2],
        [U, U, 4, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(List([
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

      expect(nextState).to.equal(List([
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

      expect(nextState).to.equal(List());
    });

    it('gets no tiles from state', () => {
      const state = fromJS([  // :off
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
        [U, U, U, U],
      ]);  // :on

      const nextState = getTiles(state);

      expect(nextState).to.equal(List());
    });
  });
});
