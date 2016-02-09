import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

import PureComponent from '../../lib/PureComponent.jsx';
import { CELL, tileSpringConfig } from './constants';

const SIZE = 107;

class GameTile extends PureComponent {
  static propTypes = {
    tile: ImmutablePropTypes.contains({
      value: PropTypes.number.isRequired,
      row: PropTypes.number.isRequired,
      col: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      isNew: PropTypes.bool.isRequired,
    }),
  };

  render() {
    const { row, col } = this.props.tile.toJS();
    const style = {  // :off
      left: spring(CELL * col, tileSpringConfig),
      top: spring(CELL * row, tileSpringConfig),
      opacity: spring(1, tileSpringConfig),
    };  // :on
    return (
      <Motion style={style}>
        {this.renderTile.bind(this)}
      </Motion>
    );
  }

  renderTile(style) {
    const { value, id, isNew } = this.props.tile.toJS();
    const tileClass = classNames(  // :off
      'tile',
      `tile-value-${this.getValueText(value)}`,
      { 'tile-new': isNew }
    );  // :on
    return (
      <div
        key={id}
        className={tileClass}
        style={style}
      >
        <div className="tile-inner">
          {value}</div>
      </div>
    );
  }

  getValueText(value) {
    return value <= 2048 ? value : 'super';
  }
}

export default GameTile;
