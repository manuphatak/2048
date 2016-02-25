import React, { PropTypes } from 'react';
import styles from './Scores.scss';

export function Scores({ score, topScore }) {
  return (
    <div className={styles.container}>
      <div className={styles.currentScore}>
        {score}
      </div>
      <div className={styles.topScore}>
        {topScore}
      </div>
    </div>
  );
}

Scores.propTypes = {
  score: PropTypes.number.isRequired,

  topScore: PropTypes.number.isRequired,
};
