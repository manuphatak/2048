import { createStore, compose, applyMiddleware } from 'redux';
import { reducer } from '../modules';
import { INITIAL_STATE } from '../constants';
import { middleware } from '../middleware';

/**
 * Create a redux store for the production environment.
 * @param {object|immutable.Map} initialState
 * @return {object} Store
 * */
export function configureStore(initialState = INITIAL_STATE) {
  const enhancer = compose(applyMiddleware(...middleware));
  return createStore(reducer, initialState, enhancer);
}

