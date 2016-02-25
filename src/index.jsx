require('./lib/immutable');

import React from 'react';
import { render } from 'react-dom';
import { App } from './containers/App';
import { configureStore } from './core/configureStore';
import { titlePrefix } from './config';
import { setState } from './core/modules/root';
import { STORAGE_KEY } from './core/constants';
import { storage } from './lib/storage';

const store = configureStore();

store.dispatch(setState(storage.get(STORAGE_KEY)));

store.subscribe(async() => await storage.set(STORAGE_KEY, store.getState().toJS()));

render(<App store={store} title={titlePrefix} />, document.getElementById('app'));
