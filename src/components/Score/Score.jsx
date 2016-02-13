import React, { PropTypes }from 'react';
import { connect } from 'react-redux';
import PureComponent from '../../lib/PureComponent';
import './Score.scss';

class Score extends PureComponent {
  static propTypes = {
    score: PropTypes.number.isRequired, topScore: PropTypes.number.isRequired,
  };

  render() {
    const { score, topScore } = this.props;
    return (
      <div>
        <p>Current Score: {score}</p>
        <p>Best Score: {topScore}</p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const gameMeta = state.getIn(['game', 'meta']);
  return { // :off
    score: gameMeta.get('score', 0),
    topScore: gameMeta.get('topScore', 0),
  }; // :on
}

export { Score };
export default connect(mapStateToProps)(Score);
