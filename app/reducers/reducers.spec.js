/* global describe, it */
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { onShiftDown, onShiftLeft, onShiftUp, onShiftRight, onCreateTile } from '../actionCreators';
import reducer from './index';

const U = undefined; // eslint-disable-line id-length

describe('reducer', () => {
  describe('SHIFT_LEFT', () => {
    it('handles SHIFT_LEFT', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, 2],
            [U, U, 4, U],
            [U, U, U, U],
          ],  // :on
        },
      });
      const nextState = reducer(initialState, onShiftLeft());

      expect(nextState).to.equal(fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [2, U, U, U],
            [4, U, U, U],
            [U, U, U, U],
          ], // :on
        },
      }));
    });
  });

  describe('SHIFT_RIGHT', () => {
    it('handles SHIFT_RIGHT', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, 2],
            [U, U, 4, U],
            [U, U, U, U],
          ],  // :on
        },
      });
      const nextState = reducer(initialState, onShiftRight());

      expect(nextState).to.equal(fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, 2],
            [U, U, U, 4],
            [U, U, U, U],
          ], // :on
        },
      }));
    });
  });

  describe('SHIFT_DOWN', () => {
    it('handles SHIFT_DOWN', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, 2],
            [U, U, 4, U],
            [U, U, U, U],
          ],  // :on
        },
      });
      const nextState = reducer(initialState, onShiftDown());

      expect(nextState).to.equal(fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
            [U, U, 4, 2],
          ], // :on
        },
      }));
    });
  });

  describe('SHIFT_UP', () => {
    it('handles SHIFT_UP', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, 2],
            [U, U, 4, U],
            [U, U, U, U],
          ],  // :on
        },
      });
      const nextState = reducer(initialState, onShiftUp());

      expect(nextState).to.equal(fromJS({
        game: {
          status: [  // :off
            [U, U, 4, 2],
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
          ], // :on
        },
      }));
    });
  });

  describe('CREATE_TILE', () => {
    it('handles CREATE_TILE', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, 2],
            [U, U, 4, U],
            [U, U, U, U],
          ],  // :on
        },
      });
      const nextState = reducer(initialState, onCreateTile(2, 0, 0));

      expect(nextState).to.equal(fromJS({
        game: {
          status: [  // :off
            [2, U, U, U],
            [U, U, U, 2],
            [U, U, 4, U],
            [U, U, U, U],
          ], // :on
        },
      }));
    });
  });
});
