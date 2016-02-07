/* global describe, it */
import { List } from 'immutable';
import { shift } from './index';
import { expect } from 'chai';

describe('app core logic', () => {
  describe('shift', () => {
    it('shifts a number to the left', () => {
      const state = List.of(undefined, undefined, 2, undefined);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(2, undefined, undefined, undefined));
    });

    it('shifts all numbers to the left', () => {
      const state = List.of(undefined, 2, undefined, 4);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(2, 4, undefined, undefined));
    });

    it('combines like numbers', () => {
      const state = List.of(2, 2, undefined, undefined);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, undefined, undefined, undefined));
    });

    it('combines like numbers even when separated', () => {
      const state = List.of(2, undefined, 2, undefined);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, undefined, undefined, undefined));
    });

    it('does not aggressively combine numbers', () => {
      const state = List.of(2, 2, 4, undefined);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, 4, undefined, undefined));
    });

    it('combines pairs', () => {
      const state = List.of(2, 2, 2, 2);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, 4, undefined, undefined));
    });

    it('combines pairs with different values', () => {
      const state = List.of(2, 2, 4, 4);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(4, 8, undefined, undefined));
    });

    it('handles empty values', () => {
      const state = List.of(undefined, undefined, undefined, undefined);
      const nextState = shift(state);

      expect(nextState).to.equal(List.of(undefined, undefined, undefined, undefined));
    });
  });
});
