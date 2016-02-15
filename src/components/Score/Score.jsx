import React, { PropTypes }from 'react';

import PureComponent from '../../lib/PureComponent';

class Score extends PureComponent {
  static propTypes = { // :off
    score: PropTypes.number.isRequired,
    topScore: PropTypes.number.isRequired,
  }; // :on

  render() {
    const { score, topScore } = this.props;
    return (
      <div>
        <p>Current Score: <span className="score">{score}</span></p>
        <p>Best Score: <span className="top-score">{topScore}</span></p>
      </div>
    );
  }
}

export default Score;
