/* @flow */
/* eslint no-unused-vars: 0*/

type Location = Object;
type LocationListener = (location:Location) => void
type History = {
  listen(listener:LocationListener):Function,
};

type HistoryOptions = Object;
type HistoryQueries = Object;
type CreateHistory<T> = (options?:HistoryOptions) => T;

declare module 'history/lib/createBrowserHistory' {
  declare function exports(options?:HistoryOptions):History;
}

declare module 'history/lib/useQueries' {
  declare function exports<T>(createHistory:CreateHistory<T>):CreateHistory<T & HistoryQueries>;
}
