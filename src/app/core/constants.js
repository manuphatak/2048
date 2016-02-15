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

      inProgress: false,

      gameOver: false,

      gameWon: false,
    },
  },
});

export const GAME_WON_TILE = 2048;
