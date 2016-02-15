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

    meta: {
      score: 0,

      topScore: 0,

      gameStarted: false,

      gameOver: false,

      gameWon: false,
    },
  },
});
