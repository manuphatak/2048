import { createStore, compose } from 'redux';
import reducer from '../reducers';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { INITIAL_STATE } from '../core/constants';
import middleware from '../middleware';

export default function makeStore(initialState = INITIAL_STATE) {
  const activateDevTools = canUseDOM && window.devToolsExtension ? window.devToolsExtension() : e => e;
  const enhancer = compose(middleware(), activateDevTools);
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer());
    });
  }

  return store;
}