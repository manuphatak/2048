import React, { PropTypes } from 'react';
import styles from './Message.scss';

export function Message({ handleNewGame }) {
  return (
    <div className={styles.container}>
      <h1>Game Over!</h1>
      <div className={styles.lower}>
        <button
          className={styles.tryAgain}
          onClick={handleNewGame}
        >Try Again
        </button>
      </div>
    </div>
  );
}

Message.propTypes = {
  handleNewGame: PropTypes.func.isRequired,
};
