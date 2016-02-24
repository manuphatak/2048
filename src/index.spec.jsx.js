/* eslint-env jasmine */

import { INITIAL_STATE } from './core/constants';

describe('temp', () => {
  it('is false', () => {
    expect(INITIAL_STATE).toEqualImmutable(INITIAL_STATE.set('isLoading', true));
  });
});
