import React, { PropTypes } from 'react';
import styles from './Scores.scss';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(Scores);

function mapStateToProps(state) {
  const gameMeta = state.getIn(['game', 'meta']);
  return { // :off
    score: gameMeta.get('score', 0),
    topScore: gameMeta.get('topScore', 0),
  }; // :on
}
