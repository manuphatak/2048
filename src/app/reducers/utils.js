export const includeRootReducer = (rootReducer, mainReducer) => (initialState, action) => (
  mainReducer(rootReducer(initialState, action), action)
);
