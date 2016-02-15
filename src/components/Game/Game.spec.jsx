/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithClass, Simulate,
} from 'react-addons-test-utils';
import { expect } from 'chai';
import { Set } from 'immutable';
import { spy } from 'sinon';
import Game from './Game';

const KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

describe('Game', () => {
  let props;
  let component;
  beforeEach(() => {
    props = defaultProps();
    component = renderIntoDocument((
      <Game {...props} />
    ));
  });

  describe('render', () => {
    it('renders a set of buttons', () => {
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons.length).to.be.equal(5);
    });
  });

  describe.skip('keypress handler', () => {
    it('triggers handleShiftLeft on keydown', (done) => {
      // setup
      const keyCode = KEY.LEFT;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      expect(props.actions.handleShiftLeft).to.have.been.calledOnce;
      expect(props.actions.handleShiftLeft).to.have.been.calledWith(event);

      done();
    });

    it.skip('triggers handleShiftUp on keydown', (done) => {
      // setup
      const keyCode = KEY.UP;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      expect(props.actions.handleShiftUp).to.have.been.calledOnce;
      expect(props.actions.handleShiftUp).to.have.been.calledWith(event);

      done();
    });

    it.skip('triggers handleShiftRight on keydown', (done) => {
      // setup
      const keyCode = KEY.RIGHT;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      expect(props.actions.handleShiftRight).to.have.been.calledOnce;
      expect(props.actions.handleShiftRight).to.have.been.calledWith(event);

      done();
    });

    it.skip('triggers handleShiftDown on keydown', (done) => {
      // setup
      const keyCode = KEY.DOWN;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      expect(props.actions.handleShiftDown).to.have.been.calledOnce;
      expect(props.actions.handleShiftDown).to.have.been.calledWith(event);
      done();
    });
  });

  describe('new game', () => {
    it('triggers handleNewGame on buttonClick', () => {
      // setup
      const button = findRenderedDOMComponentWithClass(component, 'new-game');
      expect(button).to.be.instanceOf(Object);

      // click
      Simulate.click(button);

      expect(props.actions.handleNewGame).to.have.been.calledOnce;
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
