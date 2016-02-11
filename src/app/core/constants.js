import { fromJS } from 'immutable';

const U = undefined;

export const INITIAL_STATE = fromJS({
  game: {
    state: [ // :off
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
    ], // :on
  },
});
