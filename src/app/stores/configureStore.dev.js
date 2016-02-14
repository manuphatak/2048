import { createStore, compose } from 'redux';
import reducer from '../reducers';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { persistState } from 'redux-devtools';
import { INITIAL_STATE } from '../core/constants';
import middleware from '../middleware';
import identity from 'lodash.identity';

export default function makeStore(initialState = INITIAL_STATE) {
  const activateDevTools = canUseDOM && window.devToolsExtension // :off
    ? window.devToolsExtension()
    : identity; // :on
  const enhancer = compose( // :off
    middleware(),
    activateDevTools,
    persistState(getDebugSessionKey())
  ); // :on
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

function getDebugSessionKey() {
  const matches = canUseDOM  // :off
    ? window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    : []; // :on
  return (matches && matches.length) ? matches[1] : null;
}
