import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid } from '../../components/Grid';
import { Tiles } from '../../components/Tiles';
import { Scores } from '../../components/Scores';
import { Message } from '../../components/Message';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../core/modules/game';
import styles from './Game.scss';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.keymap = {
      [37]: this.props.actions.handleShiftLeft,
      [38]: this.props.actions.handleShiftUp,
      [39]: this.props.actions.handleShiftRight,
      [40]: this.props.actions.handleShiftDown,
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

  render() {
    const { tiles, actions, score, topScore, gameOver } = this.props;

    const message = !gameOver ? null : (<Message handleNewGame={actions.handleNewGame} />);

    return (
      <div className={styles.Game}>
        <div className={styles.header}>
          <h1 className={styles.title}>2048</h1>
          <Scores {...{ score, topScore }} />
        </div>
        <div className={styles.description}>
          <p>Join the tiles to get a <b>2048 tile!</b></p>
          <button
            className={styles.newGame}
            onClick={actions.handleNewGame}
          >
            New Game
          </button>
        </div>
        <div className={styles.container}>
          <Grid />

          <Tiles tiles={tiles} />

          {message}
        </div>

      </div>
    );
  }
}
Game.propTypes = {
  actions: PropTypes.shape({
    handleShiftLeft: PropTypes.func.isRequired,
    handleShiftRight: PropTypes.func.isRequired,
    handleShiftDown: PropTypes.func.isRequired,
    handleShiftUp: PropTypes.func.isRequired,
    handleNewGame: PropTypes.func.isRequired,
  }),

  tiles: ImmutablePropTypes.setOf(ImmutablePropTypes.map).isRequired,

  score: PropTypes.number.isRequired,

  topScore: PropTypes.number.isRequired,

  gameOver: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);

function mapStateToProps(state) {
  const gameMeta = state.getIn(['game', 'meta']);
  return { // :off
    tiles: state.getIn(['game', 'state']).toTileSet(),
    isLoading: state.get('isLoading'),
    score: gameMeta.get('score', 0),
    topScore: gameMeta.get('topScore', 0),
    gameOver: gameMeta.get('gameOver'),
  }; // :on
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}
