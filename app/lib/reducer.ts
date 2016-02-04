import {Map} from 'immutable';

export default function reducer(state = Map(), action) {
    switch (action.type) {
        case 'INCREMENT':
            return state.update('value', 0, v => v + 1);
        case 'DECREMENT':
            return state.update('value', 0, v => v - 1);
        default:
            return state;
    }
}
