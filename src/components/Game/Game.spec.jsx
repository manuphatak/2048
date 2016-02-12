/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';
import { Set } from 'immutable';
import { spy } from 'sinon';

import { Game } from './Game';

const KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

describe('Game', () => {
  describe('render', () => {
    it('renders a set of buttons', () => {
      const props = defaultProps();
      const component = renderIntoDocument((
        <Game {...props} />
      ));
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons.length).to.be.equal(4);
    });
  });

  describe('props', () => {
    it('trigger handleShiftLeft on keydown', () => {
      // setup
      const keyCode = KEY.LEFT;
      const props = defaultProps();
      const event = new window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode });

      // simulate
      renderIntoDocument(<Game {...props} />);
      window.dispatchEvent(event);

      expect(props.actions.handleShiftLeft).to.have.been.calledOnce;
      expect(props.actions.handleShiftLeft).to.have.been.calledWith(event);
    });
    it('trigger handleShiftUp on keydown', () => {
      // setup
      const keyCode = KEY.UP;
      const props = defaultProps();
      const event = new window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode });

      // simulate
      renderIntoDocument(<Game {...props} />);
      window.dispatchEvent(event);

      expect(props.actions.handleShiftUp).to.have.been.calledOnce;
      expect(props.actions.handleShiftUp).to.have.been.calledWith(event);
    });
    it('trigger handleShiftRight on keydown', () => {
      // setup
      const keyCode = KEY.RIGHT;
      const props = defaultProps();
      const event = new window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode });

      // simulate
      renderIntoDocument(<Game {...props} />);
      window.dispatchEvent(event);

      expect(props.actions.handleShiftRight).to.have.been.calledOnce;
      expect(props.actions.handleShiftRight).to.have.been.calledWith(event);
    });
    it('trigger handleShiftDown on keydown', () => {
      // setup
      const keyCode = KEY.DOWN;
      const props = defaultProps();
      const event = new window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode });

      // simulate
      renderIntoDocument(<Game {...props} />);
      window.dispatchEvent(event);

      expect(props.actions.handleShiftDown).to.have.been.calledOnce;
      expect(props.actions.handleShiftDown).to.have.been.calledWith(event);
    });
    it.skip('fires a handleNewGame event on mounting', () => {
      const props = defaultProps();
      renderIntoDocument(<Game {...props} />);

      expect(props.actions.handleNewGame).to.have.been.calledOnce;
      expect(props.actions.handleNewGame).to.have.been.calledWith();
    });
  });
});

function defaultProps() {
  return {
    actions: { // :off
      handleShiftLeft: spy(),
      handleShiftRight: spy(),
      handleShiftUp: spy(),
      handleShiftDown: spy(),
      handleNewGame: spy(),
    },  // :on

    value: 2,

    tiles: Set(),
  };
}
