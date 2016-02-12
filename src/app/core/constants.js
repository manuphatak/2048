import { fromJS } from 'immutable';

const U = undefined;

export const INITIAL_STATE = fromJS({
  isLoading: false,

  game: {
    state: [ // :off
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
          [U, U, U, U],
    ], // :on
  },
});
