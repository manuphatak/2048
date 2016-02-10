import { fromJS, Map } from 'immutable';

const U = undefined;

export const INITIAL_STATE = fromJS({
  game: {
    status: [    // :off
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
    ],  // :on
    tiles: Map(),
  },
});
