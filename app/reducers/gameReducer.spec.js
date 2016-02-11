/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { fromJS, Map } from 'immutable';

import { handleShiftDown, handleShiftLeft, handleShiftUp, handleShiftRight, onCreateTile } from '../actionCreators';
import reducer from './gameReducer';
import { placeholderFactory } from '../core/utils';

const U = undefined;

describe('gameReducer', () => {
  const [a, b] = [placeholderFactory(2), placeholderFactory(4)];
  const [A, B] = [a.updateGrid(3, 1), b.updateGrid(2, 2)];
  describe('SHIFT_LEFT', () => {
    it('handles SHIFT_LEFT', () => {
      const initialState = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A], [b.get('id'), B],
        ]),
      });
      const nextState = reducer(initialState, handleShiftLeft());

      const expected = fromJS({
        status: [ // :off
          [U, U, U, U],
          [a, U, U, U],
          [b, U, U, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), a.updateGrid(0, 1).set('isNew', false)],

          [b.get('id'), b.updateGrid(0, 2).set('isNew', false)],
        ]),
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_RIGHT', () => {
    it('handles SHIFT_RIGHT', () => {
      const initialState = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A], [b.get('id'), B],
        ]),
      });
      const nextState = reducer(initialState, handleShiftRight());
      const expected = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, U, b],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), a.updateGrid(3, 1).set('isNew', false)],

          [b.get('id'), b.updateGrid(3, 2).set('isNew', false)],
        ]),
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_DOWN', () => {
    it('handles SHIFT_DOWN', () => {
      const initialState = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A], [b.get('id'), B],
        ]),
      });
      const nextState = reducer(initialState, handleShiftDown());

      const expected = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, b, a],
        ], // :on
        tiles: Map([
          [a.get('id'), a.updateGrid(3, 3).set('isNew', false)],

          [b.get('id'), b.updateGrid(2, 3).set('isNew', false)],
        ]),
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_UP', () => {
    it('handles SHIFT_UP', () => {
      const initialState = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A], [b.get('id'), B],
        ]),
      });
      const nextState = reducer(initialState, handleShiftUp());

      const expected = fromJS({
        status: [ // :off
          [U, U, b, a],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), a.updateGrid(3, 0).set('isNew', false)],

          [b.get('id'), b.updateGrid(2, 0).set('isNew', false)],
        ]),
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('CREATE_TILE', () => {
    it('handles CREATE_TILE', () => {
      const c = placeholderFactory(2);
      const C = c.updateGrid(0, 0);
      const initialState = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A], [b.get('id'), B],
        ]),
      });
      const nextState = reducer(initialState, onCreateTile([C.toJS()]));

      const expected = fromJS({
        status: [ // :off
          [c, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A],

          [b.get('id'), B],

          [c.get('id'), C.set('isNew', true)],
        ]),
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('handles CREATE_TILE with multiple tiles', () => {
      const [c, d] = [placeholderFactory(2), placeholderFactory(4)];
      const [C, D] = [c.updateGrid(0, 0), d.updateGrid(1, 0)];
      const initialState = fromJS({
        status: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A], [b.get('id'), B],
        ]),
      });
      const nextState = reducer(initialState, onCreateTile([C.toJS(), D.toJS()]));

      const expected = fromJS({
        status: [ // :off
          [c, d, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        tiles: Map([
          [a.get('id'), A],

          [b.get('id'), B],

          [c.get('id'), C.set('isNew', true)],

          [d.get('id'), D.set('isNew', true)],
        ]),
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });
});
