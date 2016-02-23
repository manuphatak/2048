import { Game as _Game } from './Game';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../app/actionCreators';
import './Game.scss';

export const Game = connect(mapStateToProps, mapDispatchToProps)(_Game);

function mapStateToProps(state) {
  return { // :off
    value: state.get('value', 0),
    tiles: state.getIn(['game', 'state']).toTileSet(),
    isLoading: state.get('isLoading'),
  }; // :on
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

