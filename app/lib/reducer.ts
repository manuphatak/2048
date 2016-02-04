import {Map} from 'immutable';

export default function reducer(state: Map<any, any> = Map(), action) {
    switch (action.type) {
        case 'INCREMENT':
            return state.update('value', 0, (v: number): number => v + 1);
        case 'DECREMENT':
            return state.update('value', 0, (v: number): number => v - 1);
        default:
            return state;
    }
}
