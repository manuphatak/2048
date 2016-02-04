import * as React from 'react';

export default class Counter extends React.Component<any, any> {
    render() {
        const {value, onIncrement, onDecrement} = this.props;
        return (
            <p>
                Clicked: {value} times
                <button onClick={onIncrement}>+</button>
                <button onClick={onDecrement}>-</button>

            </p>
        );
    }
}
