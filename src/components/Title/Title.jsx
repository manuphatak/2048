import React from 'react';
import Scores from '../../containers/Scores';
import styles from './Title.scss';

export function Title() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>2048</h1>
      <Scores />
    </div>
  );
}
