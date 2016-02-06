import React, { Component, PropTypes } from 'react';
import './Game.scss';
import * as actionCreators from '../../app/actionCreators';
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

    const gridContainer = (
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
      </div>
    );
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
          {gridContainer}

          <div className="tile-container">
            <div className="tile tile-2 tile-col-4 tile-row-2">
              <div className="tile-inner">2</div>
            </div>
            <div className="tile tile-2 tile-col-3 tile-row-3">
              <div className="tile-inner">2</div>
            </div>
          </div>
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
