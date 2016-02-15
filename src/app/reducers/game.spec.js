/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  handleShiftDown, handleShiftLeft, handleShiftUp, handleShiftRight, handleCreateTile, handleNewGame,
} from '../actionCreators';
import reducer from './game';
import { tileFactory } from '../core/utils';

const U = undefined;

describe('gameReducer', () => {
  const [a, b] = [tileFactory(2, 3, 1), tileFactory(4, 2, 2)];

  describe('SHIFT_LEFT', () => {
    it('handles SHIFT_LEFT', () => {
      const initialState = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      const nextState = reducer(initialState, handleShiftLeft());

      const [A, B] = [a.updateGrid(0, 1, false), b.updateGrid(0, 2, false)];
      const expected = fromJS({
        state: [ // :off
          [U, U, U, U],
          [A, U, U, U],
          [B, U, U, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_RIGHT', () => {
    it('handles SHIFT_RIGHT', () => {
      const initialState = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      const nextState = reducer(initialState, handleShiftRight());
      const [A, B] = [a.updateGrid(3, 1, false), b.updateGrid(3, 2, false)];
      const expected = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, A],
          [U, U, U, B],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_DOWN', () => {
    it('handles SHIFT_DOWN', () => {
      const initialState = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      const nextState = reducer(initialState, handleShiftDown());

      const [A, B] = [a.updateGrid(3, 3, false), b.updateGrid(2, 3, false)];
      const expected = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, B, A],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('SHIFT_UP', () => {
    it('handles SHIFT_UP', () => {
      const initialState = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      const nextState = reducer(initialState, handleShiftUp());

      const [A, B] = [a.updateGrid(3, 0, false), b.updateGrid(2, 0, false)];
      const expected = fromJS({
        state: [ // :off
          [U, U, B, A],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('CREATE_TILE', () => {
    const [A, B] = [a, b].map(tile => tile.set('isNew', false));
    it('handles CREATE_TILE', () => {
      const c = tileFactory(2, 0, 0);

      const initialState = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      const nextState = reducer(initialState, handleCreateTile([c.toJS()]));

      const C = c.set('isNew', true);
      const expected = fromJS({
        state: [ // :off
          [C, U, U, U],
          [U, U, U, A],
          [U, U, B, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    it('handles CREATE_TILE with multiple tiles', () => {
      const [c, d] = [tileFactory(2, 0, 0), tileFactory(4, 1, 0)];
      const initialState = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      const nextState = reducer(initialState, handleCreateTile([c.toJS(), d.toJS()]));

      const [C, D] = [c, d].map(tile => tile.set('isNew', true));
      const expected = fromJS({
        state: [ // :off
          [C, D, U, U],
          [U, U, U, A],
          [U, U, B, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });
  });

  describe('NEW_GAME', () => {
    it('resets game state', () => {
      const initialState = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, a],
          [U, U, b, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0 },
      });
      const nextState = reducer(initialState, handleNewGame());

      const expected = fromJS({
        state: [ // :off
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
        ], // :on
        meta: { score: 0, topScore: 0, inProgress: true, gameWon: false, gameOver: false },
      });
      expect(nextState.toJS().meta).to.deep.equal(expected.toJS().meta);
      expect(nextState.toJS()).to.deep.equal(expected.toJS());
      expect(nextState).to.equal(expected);
    });

    describe('resetting the score', () => {
      let initialState;
      let nextState;
      let expected;
      beforeEach('reduce to next state', () => {
        initialState = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          meta: { score: 100, topScore: 200, inProgress: false, gameWon: true, gameOver: true },
        });
        nextState = reducer(initialState, handleNewGame());

        expected = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
          ], // :on
          meta: { score: 0, topScore: 200, inProgress: true, gameWon: false, gameOver: false },
        });
      });
      it('sets current score to 0', () => {
        expect(nextState.toJS().meta.score).to.deep.equal(expected.toJS().meta.score);
      });

      it('leaves topScore unchanged', () => {
        expect(nextState.toJS().meta.topScore).to.deep.equal(expected.toJS().meta.topScore);
      });

      it('preserves state shape', () => {
        expect(nextState.toJS()).to.deep.equal(expected.toJS());
        expect(nextState).to.equal(expected);
      });
    });

    describe('updates game status', () => {
      let initialState;
      let nextState;
      let expected;
      beforeEach('reduce to next state', () => {
        initialState = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, a],
            [U, U, b, U],
            [U, U, U, U],
          ], // :on
          meta: { score: 0, topScore: 0, inProgress: false, gameWon: true, gameOver: true },
        });
        nextState = reducer(initialState, handleNewGame());

        expected = fromJS({
          state: [ // :off
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
            [U, U, U, U],
          ], // :on
          meta: { score: 0, topScore: 0, inProgress: true, gameWon: false, gameOver: false },
        });
      });
      it('sets inProgress to true', () => {
        expect(nextState.toJS().meta.inProgress).to.be.ok;
      });
      it('sets gameWon to false', () => {
        expect(nextState.toJS().meta.gameWon).to.not.be.ok;
      });
      it('set gameOver to false', () => {
        expect(nextState.toJS().meta.gameOver).to.not.be.ok;
      });
      it('preserves state shape', () => {
        expect(nextState.toJS().meta).to.deep.equal(expected.toJS().meta);
        expect(nextState.toJS()).to.deep.equal(expected.toJS());
        expect(nextState).to.equal(expected);
      });
    });
  });
});
