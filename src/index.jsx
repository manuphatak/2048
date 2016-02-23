import React from 'react';
import { render } from 'react-dom';
import { App } from './containers/App';
import { configureStore } from './app/configureStore';
import { titlePrefix } from './config';

const store = configureStore();

render(<App store={store} title={titlePrefix} />, document.getElementById('app'));
