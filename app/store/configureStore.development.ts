import {Map} from 'immutable';
import {createStore, compose} from 'redux';
import {persistState} from 'redux-devtools';

import reducer from '../lib/reducer';
import DevTools from '../components/DevTools';

const devToolsExtension = window.devToolsExtension ? window.devToolsExtension() : f => f;
const enhancer = compose(devToolsExtension
    , DevTools.instrument(), persistState(getDebugSessionKey())
);


function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0 ) ? matches[1] : null;
}

export default function configureStoreDevelopment(initialState = Map()) {
    const store = createStore(reducer, initialState, enhancer);

    return store;
}
