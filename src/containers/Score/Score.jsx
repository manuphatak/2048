import React, { PropTypes } from 'react';
import styles from './Score.scss';
import { connect } from 'react-redux';

export function Score(props) {
  return (
    <div className={styles.Score}>
      <p className={styles.title}>{props.children}</p>
      <p className={styles.value}>{props[props.name]}</p>
    </div>
  );
}

Score.propTypes = {
  score: PropTypes.number.isRequired,

  topScore: PropTypes.number.isRequired,

  name: PropTypes.string.isRequired,

  children: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Score);

function mapStateToProps(state) {
  const gameMeta = state.getIn(['game', 'meta']);
  return { // :off
    score: gameMeta.get('score', 0),
    topScore: gameMeta.get('topScore', 0),
  }; // :on
}
