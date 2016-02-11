/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { fromJS } from 'immutable';
import { tileFactory } from './utils';
import { expect } from 'chai';

describe('app utilities', () => {
  describe('tileFactory', () => {
    it('creates a tile', () => {
      expect(tileFactory(2, 0, 0, 1)).to.equal(fromJS({ value: 2, col: 0, row: 0, id: 1 }));
    });
  });
});
