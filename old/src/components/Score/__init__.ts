import { connect } from 'react-redux';
import './Score.scss';
import { Score as _Score } from './Score';

export const Score = connect(mapStateToProps)(_Score);

function mapStateToProps(state) {
  const gameMeta = state.getIn([ 'game', 'meta' ]);
  return { // :off
    score: gameMeta.get('score', 0),
    topScore: gameMeta.get('topScore', 0),
  }; // :on
}
