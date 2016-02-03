import {Map} from 'immutable';
import {createStore, compose} from 'redux';
import {persistState} from 'redux-devtools';

import reducer from '../lib/reducer';
import DevTools from '../components/DevTools';


const enhancer = compose(
    DevTools.instrument(), persistState(getDebugSessionKey()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);


function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0 ) ? matches[1] : null;
}

export default function (initialState = Map()) {
    const store = createStore(reducer, initialState, enhancer);

    return store;
}