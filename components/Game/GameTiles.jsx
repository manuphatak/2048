import React from 'react';
import GameTile from './GameTile.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default ({ tiles }) => {
  const tileElements = tiles.map(tile => (
    <GameTile
      tile={tile}
      key={tile.get('id')}
    />));
  return (
    <div className="tile-container">
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionLeaveTimeout={300}
        transitionEnterTimeout={500}
      >
        {tileElements}
      </ReactCSSTransitionGroup>
    </div>
  );
};
