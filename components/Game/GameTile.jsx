import React, { PropTypes } from 'react';
import PureComponent from '../../lib/PureComponent.jsx';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

class GameTile extends PureComponent {
  static propTypes = {
    tile: ImmutablePropTypes.contains({
      value: PropTypes.number.isRequired,
      row: PropTypes.number.isRequired,
      col: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { value, row, col, id } = this.props.tile.toObject();
    const tileClass = classNames('tile',
      `tile-${value <= 2048
        ? value
        : 'super'}`,
      `tile-col-${col}`,
      `tile-row-${row}`);
    return (
      <div
        key={id}
        className={tileClass}
      >
        <div className="tile-inner">{value}</div>
      </div>
    );
  }
}

export default GameTile;
