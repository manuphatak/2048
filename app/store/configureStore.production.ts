import {Map} from 'immutable';
import {createStore} from 'redux';
import reducer from '../lib/reducer';


export default function configureStoreProduction(initialState = Map()) {
    return createStore(reducer, initialState);
}