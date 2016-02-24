import React, { PropTypes } from 'react';
import { Tile } from '../Tile';
import styles from './Tiles.scss';

export function Tiles({ tiles }) {
  return (
    <div className={styles.container}>
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
  tiles: PropTypes.any, // TODO real props
};
