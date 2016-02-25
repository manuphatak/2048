import { INITIAL_STATE } from '../../constants';

const SET_STATE_INIT = '2048/root/SET_STATE_INIT';
const SET_STATE_COMPLETE = '2048/root/SET_STATE_COMPLETE';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_STATE_INIT:
      return state.set('isLoading', true);
    case SET_STATE_COMPLETE:
      return state.merge(action.payload)
                  .set('isLoading', false);
    default:
      return state;
  }
}

function setStateInit() {
  return { type: SET_STATE_INIT };
}

function setStateComplete(payload) {
  return { type: SET_STATE_COMPLETE, payload };
}

export function setState(payload) {
  return async(dispatch) => {
    dispatch(setStateInit());
    dispatch(setStateComplete(INITIAL_STATE.merge(await payload).toJS()));
  };
}
