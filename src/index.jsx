require('./lib/immutable');

import React from 'react';
import { render } from 'react-dom';
import { App } from './containers/App';
import { configureStore } from './core/configureStore';
import { titlePrefix } from './config';
import { setState } from './core/modules/root';
import { INITIAL_STATE } from './core/constants';

const store = configureStore();

store.dispatch(setState(INITIAL_STATE.toJS()));

render(<App store={store} title={titlePrefix} />, document.getElementById('app'));
