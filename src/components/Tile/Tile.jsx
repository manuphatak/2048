import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './Tile.scss';
import { CELL_SPACE, tileNewConfig, tileSlideConfig } from './constants';
import { GAME_WON_TILE } from '../../core/constants';

export function Tile({ tile }) {
  const { value, row, col, id } = tile;

  const tileClass = classNames(// :off
    styles.Tile,
    styles[`value-${getValueText(value)}`]
  ); // :on

  return (
    <Motion {...getMotionProps(row, col)}>
      {style => renderTile(style, { tileClass, value, id })}
    </Motion>

  );
}

Tile.propTypes = {
  tile: PropTypes.shape({
    value: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    isNew: PropTypes.bool.isRequired,
  }),
};

function renderTile(style, { tileClass, value, id }) {
  const nextStyle = _.merge({}, style, { transform: `scale(${style.scale})` });

  return (
    <div
      key={id}
      className={tileClass}
      style={nextStyle}
    >
      <div className={styles.inner}>
        {value}
      </div>
    </div>
  );
}

function getValueText(value) {
  return value <= GAME_WON_TILE ? value : 'super';
}

function getMotionProps(row, col) {
  return { // :off
    defaultStyle: {
      left: CELL_SPACE * col,
      top: CELL_SPACE * row,
      scale: 0,
    },
    style: {
      left: spring(CELL_SPACE * col, tileSlideConfig),
      top: spring(CELL_SPACE * row, tileSlideConfig),
      scale: spring(1, tileNewConfig),
    },
  }; // :on
}
