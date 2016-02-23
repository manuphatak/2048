/**
 * Create a pipeline from reducers.
 *
 * @param {(object|immutable.Map)} initialState
 * @param {...Function} reducers - Reducers to chain.
 * @returns {Function} A single reducer.
 */
export function pipe(initialState, ...reducers) {
  return function reducer(state = initialState, action) {
    return reducers.reduce((nextState, nextReducer) => nextReducer(nextState, action), state);
  };
}
