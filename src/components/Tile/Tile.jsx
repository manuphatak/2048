import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';
import { merge } from 'lodash';
import styles from './Tile.scss';

// TODO find a place for these
const CELL_SPACE = 121;
const tileSlideConfig = { stiffness: 210, damping: 18 };
const tileNewConfig = { stiffness: 210, damping: 15 };

export function Tile({ tile }) {
  const { value, row, col, id, isNew } = tile;

  const tileClass = classNames(// :off
    styles.container,
    styles[`value-${getValueText(value)}`]
  ); // :on

  const motionProps = { // :off
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

  return (
    <Motion {...motionProps}>
      {style => renderTile(style, { tileClass, value, id })}
    </Motion>

  );
}

Tile.propTypes = {  // TODO real props
  tile: PropTypes.any, /*
   tile: ImmutablePropTypes.contains({
   value: PropTypes.number.isRequired,
   row: PropTypes.number.isRequired,
   col: PropTypes.number.isRequired,
   id: PropTypes.string.isRequired,
   isNew: PropTypes.bool.isRequired,
   }),*/
};

function renderTile(style, { tileClass, value, id }) {
  const nextStyle = merge({}, style, { transform: `scale(${style.scale})` });

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
  return value <= 2048 ? value : 'super'; // TODO GAME_WON constant
}
