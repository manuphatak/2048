import React from 'react';
import Game from '../../containers/Game';
import KeyboardControls from '../../containers/KeyboardControls';
import styles from './Layout.scss';
import Score from '../../containers/Score';
import NewGameButton from '../../containers/NewGameButton';

export function Layout() {
  return (
    <div className={styles.Layout}>

      <Title />

      <Description />

      <Game />

      <KeyboardControls />

    </div>
  );
}

export function Title() {
  return (
    <div className={styles.Title}>
      <h1>2048</h1>
      <div className={styles.scores}>
        <Score name="score" />

        <Score name="topScore" />
      </div>
    </div>
  );
}

export function Description() {
  return (
    <div className={styles.Description}>
      <p>Join the tiles to get a <b>2048 tile!</b></p>

      <NewGameButton>New Game</NewGameButton>
    </div>
  );
}

