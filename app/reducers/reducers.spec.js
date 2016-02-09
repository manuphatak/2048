/* global describe, it */
import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import { onShiftDown, onShiftLeft, onShiftUp, onShiftRight, onCreateTile } from '../actionCreators';
import reducer from './reducers';
import { placeholderFactory } from '../core/utils';
const U = undefined; // eslint-disable-line id-length

describe('reducer', () => {
  const [a, b] = [placeholderFactory(2), placeholderFactory(4)];
  const [A, B] = [a.updateGrid(3, 1), b.updateGrid(2, 2)];
  describe('SHIFT_LEFT', () => {
    it('handles SHIFT_LEFT', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), A], [b.get('id'), B],
          ]),
        },
      });
      const nextState = reducer(initialState, onShiftLeft());

      const expected = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [a, U, U, U],
            [b, U, U, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), a.updateGrid(0, 1).set('isNew', false).set('from', A)],

            [b.get('id'), b.updateGrid(0, 2).set('isNew', false).set('from', B)],
          ]),
        },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_RIGHT', () => {
    it('handles SHIFT_RIGHT', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), A], [b.get('id'), B],
          ]),
        },
      });
      const nextState = reducer(initialState, onShiftRight());
      const expected = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, U, b],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), a.updateGrid(3, 1).set('isNew', false).set('from', A)],

            [b.get('id'), b.updateGrid(3, 2).set('isNew', false).set('from', B)],
          ]),
        },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_DOWN', () => {
    it('handles SHIFT_DOWN', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), A], [b.get('id'), B],
          ]),
        },
      });
      const nextState = reducer(initialState, onShiftDown());

      const expected = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
            [U, U, b, a],
          ], // :on
          tiles: Map([
            [a.get('id'), a.updateGrid(3, 3).set('isNew', false).set('from', A)],

            [b.get('id'), b.updateGrid(2, 3).set('isNew', false).set('from', B)],
          ]),
        },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_UP', () => {
    it('handles SHIFT_UP', () => {
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), A], [b.get('id'), B],
          ]),
        },
      });
      const nextState = reducer(initialState, onShiftUp());

      const expected = fromJS({
        game: {
          status: [  // :off
            [U, U, b, a],
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), a.updateGrid(3, 0).set('isNew', false).set('from', A)],

            [b.get('id'), b.updateGrid(2, 0).set('isNew', false).set('from', B)],
          ]),
        },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('CREATE_TILE', () => {
    it('handles CREATE_TILE', () => {
      const c = placeholderFactory(2);
      const tile = c.updateGrid(0, 0).toJS();
      const initialState = fromJS({
        game: {
          status: [  // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), A], [b.get('id'), B],
          ]),
        },
      });
      const nextState = reducer(initialState, onCreateTile(tile.value, tile.col, tile.row, tile.id));

      const expected = fromJS({
        game: {
          status: [  // :off
            [c, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          tiles: Map([
            [a.get('id'), a.updateGrid(3, 1)],

            [b.get('id'), b.updateGrid(2, 2)],

            [c.get('id'), c.updateGrid(0, 0).set('isNew', true)],
          ]),
        },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });
});
