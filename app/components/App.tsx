import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Counter from './Counter';
import * as actionCreators from '../actions/counterActionCreators';

export class App extends React.Component<any, any> {

    public render() {
        return <Counter {...this.props}/>;
    }

}

export default connect(mapStateToProps, actionCreators)(App);

function mapStateToProps(state) {
    return {value: state.get('value', 0)}
}

