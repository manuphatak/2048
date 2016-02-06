import { createStore, compose } from 'redux';
import reducer from '../reducers';
import { Map } from 'immutable';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

export default function makeStore(initialState = Map()) {
  const activateDevTools = canUseDOM && window.devToolsExtension
    ? window.devToolsExtension()
    : e => e;
  const enhancer = compose(activateDevTools);
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
