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
    const { value, row, col, id, from, isNew } = this.props.tile.toJS();
    const fromClass = from === undefined  // :off
      ? []
      : [
        `tile-from-col-${from.col}`,
        `tile-from-row-${from.row}`,
        `tile-from-value-${this.getValueText(from.value)}`,
      ];  // :on
    const tileClass = classNames('tile',
      `tile-value-${this.getValueText(value)}`,
      `tile-col-${col}`,
      `tile-row-${row}`,
      ...fromClass,
      { 'tile-new': isNew });
    return (
      <div
        key={id}
        className={tileClass}
      >
        <div className="tile-inner">{value}</div>
      </div>
    );
  }

  getValueText(value) {
    return value <= 2048
      ? value
      : 'super';
  }
}

export default GameTile;
