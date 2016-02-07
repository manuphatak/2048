import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class GameTile extends Component {
  static propTypes = {
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  render() {
    const { value, row, col } = this.props;
    const tileClass = classNames('tile', `tile-${value}`, `tile-col-${col}`, `tile-row-${row}`);
    return (
      <div className={tileClass}>
        <div className="tile-inner">{value}</div>
      </div>
    );
  }
}

export default GameTile;
