import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../../core/modules/game';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class KeyboardControls extends Component {
  constructor(props) {
    super(props);
    this.keymap = {
      [37]: this.props.handleShiftLeft,
      [38]: this.props.handleShiftUp,
      [39]: this.props.handleShiftRight,
      [40]: this.props.handleShiftDown,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown(event) {
    const handler = this.keymap[event.keyCode];

    if (!handler) { return;}

    event.preventDefault();
    handler(event);
  }

  render() {return <span >&nbsp;</span>;}
}
KeyboardControls.propTypes = {
  handleShiftLeft: PropTypes.func.isRequired,
  handleShiftRight: PropTypes.func.isRequired,
  handleShiftDown: PropTypes.func.isRequired,
  handleShiftUp: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(KeyboardControls);

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(actionCreators, dispatch) };
}
