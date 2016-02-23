import * as React from 'react';
const { PropTypes } = React;

import { PureComponent } from '../../lib/PureComponent';

export class Score extends PureComponent {
  static propTypes = { // :off
    score: PropTypes.number.isRequired,
    topScore: PropTypes.number.isRequired,
  }; // :on

  render() {
    const { score, topScore } = this.props;
    return (
      <div>
        <p>Current Score!!!!:
          <span className="score">{score}</span>
        </p>
        <p>Best Score:
          <span className="top-score">{topScore}</span>
        </p>
      </div>
    );
  }
}
