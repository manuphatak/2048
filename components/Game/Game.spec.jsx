/* global describe, it */
import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';
import { Set } from 'immutable';
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
    it('handles left keypress', () => {
      let success = null;
      const props = defaultProps();
      props.actions.onShiftLeft = () => {success = true;};

      renderIntoDocument(<Game {...props} />);
      const event = new window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode: KEY.LEFT });
      window.dispatchEvent(event);

      expect(success).to.be.ok; // eslint-disable-line no-unused-expressions
    });
    it('handles up keypress', () => {
      let success = null;
      const props = defaultProps();
      props.actions.onShiftUp = () => {success = true;};

      renderIntoDocument(<Game {...props} />);
      keyPress(KEY.UP);

      expect(success).to.be.ok; // eslint-disable-line no-unused-expressions
    });
    it('handles right keypress', () => {
      let success = null;
      const props = defaultProps();
      props.actions.onShiftRight = () => {success = true;};

      renderIntoDocument(<Game {...props} />);
      keyPress(KEY.RIGHT);

      expect(success).to.be.ok; // eslint-disable-line no-unused-expressions
    });
    it('handles down keypress', () => {
      let success = null;
      const props = defaultProps();
      props.actions.onShiftDown = () => {success = true;};

      renderIntoDocument(<Game {...props} />);
      keyPress(KEY.DOWN);

      expect(success).to.be.ok; // eslint-disable-line no-unused-expressions
    });
  });
});

function defaultProps() {
  return {
    actions: {
      onShiftLeft: () => undefined,
      onShiftRight: () => undefined,
      onShiftUp: () => undefined,
      onShiftDown: () => undefined,
      onNewGame: () => undefined,
    },

    value: 2,

    tiles: Set(),
  };
}

function keyPress(keyCode) {
  const event = new window.KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode });
  window.dispatchEvent(event);
}
