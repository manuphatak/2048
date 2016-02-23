import { createStore, compose } from 'redux';
import { identity } from 'lodash';
import { reducer } from './modules';

export function configureStore(initialState = {}) {
  const devTools = __DEVTOOLS__ && window.devToolsExtenstion ? window.devToolsExtension : identity;

  const enhancer = compose(devTools);
  const store = createStore(reducer, initialState, enhancer);

  if (__DEV__ && module.hot) {
    module.hot.accept('./modules', () => {
      store.replaceReducer(require('./modules').reducer);
    });
  }

  return store;
}
