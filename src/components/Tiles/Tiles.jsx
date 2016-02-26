import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Tile } from '../Tile';
import styles from './Tiles.scss';

export function Tiles({ tiles }) {
  return (
    <div className={styles.Tiles}>
      {tiles.map(tile => (
        <Tile
          tile={tile.toObject()}
          key={tile.get('id')}
        />
      ))}
    </div>
  );
}

Tiles.propTypes = {
  tiles: ImmutablePropTypes.setOf(ImmutablePropTypes.map).isRequired,
};
