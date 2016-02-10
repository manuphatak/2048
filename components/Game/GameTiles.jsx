import React from 'react';

import PureComponent from '../../lib/PureComponent';
import GameTile from './GameTile';

class GameTiles extends PureComponent {
  render() {
    const { tiles } = this.props;
    return (
      <div className="tile-container">
        { tiles.map(this.renderTile)}
      </div>
    );
  }

  renderTile(tile) {
    return (
      <GameTile
        tile={tile}
        key={tile.get('id')}
      />
    );
  }
}

export default GameTiles;
