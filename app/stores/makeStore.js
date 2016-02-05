import { createStore, compose } from 'redux';
import reducer from '../reducers';
import { Map } from 'immutable';

const devTools = window.devToolsExtension
  ? window.devToolsExtension()
  : e => e;
const enhancer = compose(devTools);

export default function makeStore(initialState = Map()) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
