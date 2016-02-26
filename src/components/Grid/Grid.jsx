import React from 'react';
import styles from './Grid.scss';

export function Grid() {
  return (
    <div className={styles.Grid}>
      <div className={styles.row}>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
        <div className={styles.cell}></div>
      </div>
    </div>
  );
}
