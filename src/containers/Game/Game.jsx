import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid } from '../../components/Grid';
import { Tiles } from '../../components/Tiles';
import Message from '../Message';
import { connect } from 'react-redux';
import styles from './Game.scss';

export function Game({ tiles }) {
  return (
    <div className={styles.Game}>
      <Grid />

      <Tiles tiles={tiles} />

      <Message />

    </div>
  );
}

Game.propTypes = {
  tiles: ImmutablePropTypes.setOf(ImmutablePropTypes.map).isRequired,
};

export default connect(mapStateToProps)(Game);

function mapStateToProps(state) {
  return { // :off
    tiles: state.getIn(['game', 'state']).toTileSet(),
    isLoading: state.get('isLoading'), // TODO use here?
  }; // :on
}
