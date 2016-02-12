import { Map, fromJS } from 'immutable';
import { SET_STATE } from '../actions';

export default function root(state = Map(), action) {
  switch (action.type) {
    case SET_STATE:
      return fromJS(action.payload)
        .updateIn(['game', 'state'], gameState => gameState.withMutations(mutableState => (
          mutableState.map(row => row.map(cell => cell === null ? undefined : cell))
        )));
    default:
      return state;
  }
}
