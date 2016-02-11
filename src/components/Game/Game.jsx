import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

import PureComponent from '../../lib/PureComponent';
import * as actionCreators from '../../app/actionCreators';
import GameGrid from './GameGrid';
import GameTiles from './GameTiles';

class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.keymap = {
      37: e => this.props.actions.handleShiftLeft(e),
      38: e => this.props.actions.handleShiftUp(e),
      39: e => this.props.actions.handleShiftRight(e),
      40: e => this.props.actions.handleShiftDown(e),
    };
  }

  static propTypes = {
    actions: PropTypes.shape({
      handleShiftLeft: PropTypes.func.isRequired,
      handleShiftRight: PropTypes.func.isRequired,
      handleShiftDown: PropTypes.func.isRequired,
      handleShiftUp: PropTypes.func.isRequired,
      handleNewGame: PropTypes.func.isRequired,
    }),

    value: PropTypes.number.isRequired,

    tiles: ImmutablePropTypes.setOf(ImmutablePropTypes.map).isRequired,
  };

  render() {
    const { handleShiftLeft, handleShiftRight, handleShiftUp, handleShiftDown } = this.props.actions;
    const { tiles } = this.props;

    return (
      <div>
        <p className="buttons">
          <button onClick={handleShiftLeft}>Left</button>
          <button onClick={handleShiftRight}>Right</button>
          <button onClick={handleShiftDown}>Down</button>
          <button onClick={handleShiftUp}>Up</button>
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
    this.props.actions.handleNewGame();
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
  const tiles = state.getIn(['game', 'state'], List())
                     .flatten(true)
                     .toSet()
                     .filter(tile => tile !== undefined);
  return {
    value: state.get('value', 0), tiles,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export { Game };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
