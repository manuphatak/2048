import React, { PropTypes } from 'react';
import styles from './Message.scss';
import NewGameButton from '../NewGameButton';
import { connect } from 'react-redux';

export function Message({ gameOver, gameWon }) {
  if (gameOver) {return renderGameOver();}

  if (gameWon) {return renderGameWon();}

  return (
    <span />
  );
}

Message.propTypes = { // :off
  gameOver: PropTypes.bool.isRequired,
  gameWon: PropTypes.bool.isRequired,
}; // :on

function renderGameOver() {
  return (
    <div className={styles.container}>
      <h1>Game Over!</h1>
      <div className={styles.lower}>
        <NewGameButton>Try Again</NewGameButton>
      </div>
    </div>
  );
}

function renderGameWon() {
  return (
    <div className={styles.Message}>
      <h1>Game Won!</h1>
      <div className={styles.lower}>
        <NewGameButton>Try Again</NewGameButton>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Message);

function mapStateToProps(state) {
  const gameMeta = state.getIn(['game', 'meta']);
  return { // :off
    gameOver: gameMeta.get('gameOver'),
    gameWon: gameMeta.get('gameWon'),
  }; // :on
}
