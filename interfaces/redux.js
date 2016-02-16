import type { Action } from './app';
export type Dispatch = (action:Action) => Action;

export type Store = {
  dispatch:Dispatch,
  subscribe:?(listener:Function) => void,
  getState:() => any,
  replaceReducer:?(nextReducer:Function) => void,
};

export type Next = (action:Action) => Action;
