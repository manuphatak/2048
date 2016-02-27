import { createStore, compose, applyMiddleware } from 'redux';
import _ from 'lodash';
import { reducer } from './modules';
import { INITIAL_STATE } from './constants';
import { DEBUG_GAME_OVER, DEBUG_GAME_WON } from './constants.dev';
import { middleware } from './middleware';
import { setState } from './modules/root';

/**
 * Create a redux store for the running environment.
 * @param {object|immutable.Map} initialState
 * @return {object} Store
 * */
export function configureStore(initialState = INITIAL_STATE) {
  const enhancer = getEnhancer();
  const store = createStore(reducer, initialState, enhancer);
  if (__DEV__ && module.hot) {
    module.hot.accept('./modules', () => {
      store.replaceReducer(require('./modules').reducer);
    });
  }

  if (__DEV__) {
    /**
     * Debug function, set state to an impending game loss.
     * */
    window.gameOver = function gameOver() {
      store.dispatch(setState(DEBUG_GAME_OVER));
    };

    /**
     * Same, but for a game won and a 4096 tile.
     * */
    window.gameWon = function gameWon() {
      store.dispatch(setState(DEBUG_GAME_WON));
    };
  }

  return store;
}

/**
 * Get redux enhancer based on the environment.
 * @return {Function} Store enhancer.
 */
function getEnhancer() {
  // Guard, production environment, use middleware only.
  if (!__DEV__) {
    return compose(applyMiddleware(...middleware));
  }

  // Use redux chrome extension when it's available.
  const devTools = (__DEVTOOLS__ && window.devToolsExtension) ? window.devToolsExtension() : _.identity;

  const { persistState } = require('redux-devtools');
  return compose(// :off
    applyMiddleware(...middleware),
    devTools,
    persistState(getDebugSessionKey)
  ); // :on
}

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length) ? matches[1] : null;
}
