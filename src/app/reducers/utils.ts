export function includeRootReducer(rootReducer, mainReducer) {
  return function reducer(initialState, action) {
    const nextState = rootReducer(initialState, action);
    return mainReducer(nextState, action);
  }
}
