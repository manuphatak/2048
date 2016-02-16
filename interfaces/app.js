/* @flow */
import type { Map, List } from 'immutable';

export type Action = {
  type:string,
  payload?:any,
  meta?:Object,
};

export type ActionCreator = (...args:any) => Action;

export type GameCellJS = {
  value: number,
  row: number,
  col: number,
  fromValue: ?number,
};
export type GameCell = ?Map<number|string>;
export type GameState = List<List<GameCell>>;
export type GameMeta = Map<number|boolean>;
export type Game = Map<GameState|GameMeta>;
export type State = Map<Game|boolean>;

export type StateJS = {
  isLoading: boolean,
  game: {
    state: Array<Array<?GameCellJS>>,
    meta: {
      score: number,
      topScore: number,
      inProgress: boolean,
      gameOver: boolean,
      gameWon: boolean,
    }
  }
};

export type Reducer<T> = ((state:T, action:Action) => T);
