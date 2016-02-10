import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import PureComponent from '../../lib/PureComponent';
import * as actionCreators from '../../app/actionCreators';
import GameGrid from './GameGrid';
import GameTiles from './GameTiles';

class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.keymap = {
      37: e => this.props.actions.onShiftLeft(e),
      38: e => this.props.actions.onShiftUp(e),
      39: e => this.props.actions.onShiftRight(e),
      40: e => this.props.actions.onShiftDown(e),
    };
  }

  static propTypes = {
    actions: PropTypes.shape({
      onShiftLeft: PropTypes.func.isRequired,
      onShiftRight: PropTypes.func.isRequired,
      onShiftDown: PropTypes.func.isRequired,
      onShiftUp: PropTypes.func.isRequired,
    }), value: PropTypes.number.isRequired, tiles: ImmutablePropTypes.setOf(ImmutablePropTypes.map).isRequired,
  };

  render() {
    const { onShiftLeft, onShiftRight, onShiftUp, onShiftDown } = this.props.actions;
    const { tiles } = this.props;

    return (
      <div>
        <p className="buttons">
          <button onClick={onShiftLeft}>Left</button>
          <button onClick={onShiftRight}>Right</button>
          <button onClick={onShiftDown}>Down</button>
          <button onClick={onShiftUp}>Up</button>
        </p>

        <div className="game">
          <GameGrid />

          <GameTiles tiles={tiles} />

        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillMount() {
    this.props.actions.onNewGame();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown(event) {
    const handler = this.keymap[event.keyCode];

    if (handler !== undefined) {
      event.preventDefault();
      handler(event);
    }
  }
}

function mapStateToProps(state) {
  return {
    value: state.get('value', 0),  // :off
    tiles: state.getIn(['game', 'tiles'], Map()).toSet(),  // :on
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export { Game };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
