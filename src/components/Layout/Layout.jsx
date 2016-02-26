import React from 'react';
import { Title } from '../Title';
import { Description } from '../Description';
import Game from '../../containers/Game';
import KeyboardControls from '../../containers/KeyboardControls';
import styles from './Layout.scss';

export function Layout() {
  return (
    <div className={styles.container}>

      <Title />

      <Description />

      <Game />

      <KeyboardControls />

    </div>
  );
}
