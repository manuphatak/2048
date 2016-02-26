import React from 'react';
import NewGameButton from '../../containers/NewGameButton';
import styles from './Description.scss';

export function Description() {
  return (
    <div className={styles.description}>
      <p>Join the tiles to get a <b>2048 tile!</b></p>

      <NewGameButton>New Game</NewGameButton>
    </div>
  );
}

