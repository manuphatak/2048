import React, { PropTypes } from 'react';
import styles from './NewGameButton.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../core/modules/game';

export function NewGameButton({ handleNewGame, children }) {
  return (
    <button
      className={styles.newGame}
      onClick={handleNewGame}
    >
      {children}
    </button>
  );
}

NewGameButton.propTypes = { // :off
  handleNewGame: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
}; // :on

export default connect(null, mapDispatchToProps)(NewGameButton);

function mapDispatchToProps(dispatch) {
  const { handleNewGame } = actionCreators;
  return {
    ...bindActionCreators({ handleNewGame }, dispatch),
  };
}
