///<reference path="../typings/main.d.ts"/>

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import AppRoot from './components/AppRoot';

const store = configureStore();
const appElement = document.getElementById('app');

ReactDOM.render(<AppRoot store={store}/>, appElement);
