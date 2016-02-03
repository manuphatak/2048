import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppRoot from './components/AppRoot';
import configureStore from './store/configureStore.ts';

import './main.scss';
const store = configureStore();


ReactDOM.render(<AppRoot store={store}/>, document.getElementById('app'));