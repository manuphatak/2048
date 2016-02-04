import {ActionCreator} from 'redux';
import {MapDispatchToPropsObject} from "react-redux";
const onIncrement: ActionCreator = function (e?: Event) {
    return {
        type: 'INCREMENT'
    };
};


const onDecrement: ActionCreator = function (e?: Event) {
    return {
        type: 'DECREMENT'
    };
};

export default <MapDispatchToPropsObject>{
    onIncrement,
    onDecrement
}