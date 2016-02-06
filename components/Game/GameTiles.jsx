import React from 'react';
import GameTile from './GameTile.jsx';

const tilesInit = [  // :off
  {row: 1, col: 3, value: 2 },
  {row: 2, col: 2, value: 4 },
];  // :on

export default () => {
  const tiles = tilesInit.map((tile, index) => (
    <GameTile {...tile} key={index} />
  ));
  return (
    <div className="tile-container">
      {tiles}
    </div>
  );
};
