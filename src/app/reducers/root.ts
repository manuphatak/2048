import { Map } from 'immutable';
import * as ACTIONS from '../actions';
import { INITIAL_STATE } from '../core/constants';

export function rootReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE_INIT:
      return INITIAL_STATE.set('isLoading', true);

    case ACTIONS.SET_STATE_COMPLETE:
      return state.merge(action.payload)
                  .set('isLoading', false)
                  .updateIn([ 'game', 'state' ], gameState => gameState.withMutations(mutableState => (
                    mutableState.map(row => row.map(cell => cell === null ? undefined : cell))
                  )));
    default:
      return state;
  }
}
