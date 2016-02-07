import React from 'react';
import GameTile from './GameTile.jsx';

export default ({ tiles }) => {
  const tileElements = tiles.map((tile, index) => (
    <GameTile
      tile={tile}
      key={index}
    />));
  return (
    <div className="tile-container">
      {tileElements}
    </div>
  );
};
