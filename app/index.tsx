import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, compose} from 'redux';
import {persistState} from 'redux-devtools';
import {Provider} from 'react-redux';

import DevTools from './components/DevTools';
import App from './components/App';
import reducer from './lib/reducer';

import './main.scss';


const enhancer = compose(
    DevTools.instrument(), persistState(getDebugSessionKey())
);

function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0 ) ? matches[1] : null;
}

const store = createStore(reducer, null, enhancer);


const provider = (
    <Provider store={store}>
        <div>
            <App />

            <DevTools />
        </div>

    </Provider>
);
ReactDOM.render(provider, document.getElementById('app'));