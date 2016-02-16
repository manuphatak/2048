import { connect } from 'react-redux';
import './Score.scss';
import Score from './Score';

export default connect(mapStateToProps)(Score);

function mapStateToProps(state) {
  const gameMeta = state.getIn([ 'game', 'meta' ]);
  return { // :off
    score: gameMeta.get('score', 0),
    topScore: gameMeta.get('topScore', 0),
  }; // :on
}
