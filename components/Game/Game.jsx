import React, { Component, PropTypes } from 'react';
import './Game.scss';
import * as actionCreators from '../../app/actionCreators';
import GameGrid from './GameGrid.jsx';
import GameTiles from './GameTiles.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class Game extends Component {

  static propTypes = {
    actions: PropTypes.object,
    value: PropTypes.number.isRequired,
  };

  render() {
    const { onShiftLeft, onShiftRight, onShiftUp, onShiftDown } = this.props.actions;
    const { value } = this.props;

    return (
      <div>
        <button onClick={onShiftLeft}>Left</button>
        <button onClick={onShiftRight}>Right</button>
        <button onClick={onShiftDown}>Down</button>
        <button onClick={onShiftUp}>Up</button>
        <br />

        You have clicked {value} {value === 1
        ? 'button'
        : 'buttons'}.

        <br />
        <div className="game">
          <GameGrid />

          <GameTiles />

        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { value: state.get('value', 0) };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
