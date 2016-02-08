import React, { PropTypes } from 'react';
import PureComponent from '../../lib/PureComponent.jsx';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as actionCreators from '../../app/actionCreators';
import GameGrid from './GameGrid.jsx';
import GameTiles from './GameTiles.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { getTiles } from '../../app/core/utils';

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
    }),
    value: PropTypes.number.isRequired,
    tiles: ImmutablePropTypes.setOf(ImmutablePropTypes.map).isRequired,
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
    tiles: getTiles(state.getIn(['game', 'status']), List()),  // :on
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export { Game };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
