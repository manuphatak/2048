import React, { PropTypes } from 'react';
import PureComponent from '../../lib/PureComponent.jsx';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as actionCreators from '../../app/actionCreators';
import GameGrid from './GameGrid.jsx';
import GameTiles from './GameTiles.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

class Game extends PureComponent {

  static propTypes = {
    actions: PropTypes.shape({
      onShiftLeft: PropTypes.func.isRequired,
      onShiftRight: PropTypes.func.isRequired,
      onShiftDown: PropTypes.func.isRequired,
      onShiftUp: PropTypes.func.isRequired,
    }),
    value: PropTypes.number.isRequired,
    tiles: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired,
  };

  render() {
    const { onShiftLeft, onShiftRight, onShiftUp, onShiftDown } = this.props.actions;
    const { value, tiles } = this.props;

    return (
      <div>
        <p className="buttons">
          <button onClick={onShiftLeft}>Left</button>
          <button onClick={onShiftRight}>Right</button>
          <button onClick={onShiftDown}>Down</button>
          <button onClick={onShiftUp}>Up</button>
        </p>

        <p className="message">
          You have clicked {value} {value === 1
          ? 'button'
          : 'buttons'}.
        </p>

        <div className="game">
          <GameGrid />

          <GameTiles tiles={tiles} />

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    value: state.get('value', 0),
    tiles: state.getIn([
      'game',
      'tiles',
    ], List()),
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export { Game };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
