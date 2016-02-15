import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

import PureComponent from '../../lib/PureComponent';
import { CELL_SPACE, tileSlideConfig, tileNewConfig } from './constants';

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
    const { row, col, value, id } = this.props.tile.toObject();
    const defaultStyle = {
      left: CELL_SPACE * col, top: CELL_SPACE * row, scale: 0,
    };

    const style = { // :off
      left: spring(CELL_SPACE * col, tileSlideConfig),
      top: spring(CELL_SPACE * row, tileSlideConfig),
      scale: spring(1, tileNewConfig),
    };  // :on
    const tileClass = classNames(// :off
      'tile',
      `tile-value-${this.getValueText(value)}`
    );  // :on

    return (
      <Motion
        defaultStyle={defaultStyle}
        style={style}
      >
        {this.renderTile.bind(this, { tileClass, value, id })}
      </Motion>
    );
  }

  renderTile({ tileClass, value, id }, style) {
    return (
      <div
        key={id}
        className={tileClass}
        style={{ transform: `scale(${style.scale})`, ...style }}
      >
        <div className="tile-inner">
          {value}
        </div>
      </div>
    );
  }

  getValueText(value) {
    return value <= 2048 ? value : 'super';
  }
}

export default GameTile;
