/* eslint-env jasmine */
/* global describe, it, beforeEach */
import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithClass, Simulate,
} from 'react-addons-test-utils';
import { Game } from './Game';
import { Set } from 'immutable';

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

  xdescribe('render', () => {
    it('renders a set of buttons', () => {
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons.length).toEqual(5);
    });
  });

  xdescribe('keypress handler', () => {
    it('triggers handleShiftLeft on keydown', (done) => {
      // setup
      const keyCode = KEY.LEFT;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      // expect(props.actions.handleShiftLeft).to.have.been.calledOnce;
      expect(props.actions.handleShiftLeft).toHaveBeenCalledWith(event);

      done();
    });

    xit('triggers handleShiftUp on keydown', (done) => {
      // setup
      const keyCode = KEY.UP;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      // expect(props.actions.handleShiftUp).to.have.been.calledOnce;
      expect(props.actions.handleShiftUp).toHaveBeenCalledWith(event);

      done();
    });

    xit('triggers handleShiftRight on keydown', (done) => {
      // setup
      const keyCode = KEY.RIGHT;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      // expect(props.actions.handleShiftRight).to.have.been.calledOnce;
      expect(props.actions.handleShiftRight).toHaveBeenCalledWith(event);

      done();
    });

    xit('triggers handleShiftDown on keydown', (done) => {
      // setup
      const keyCode = KEY.DOWN;
      const event = new window.KeyboardEvent('keydown', { bubbles: false, cancelable: true, keyCode });

      // simulate
      document.dispatchEvent(event);

      // expect(props.actions.handleShiftDown).to.have.been.calledOnce;
      expect(props.actions.handleShiftDown).toHaveBeenCalledWith(event);
      done();
    });
  });

  xdescribe('new game', () => {
    it('triggers handleNewGame on buttonClick', () => {
      // setup
      const button = findRenderedDOMComponentWithClass(component, 'new-game');
      expect(button).to.be.instanceOf(Object);

      // click
      Simulate.click(button);

      // expect(props.actions.handleNewGame).to.have.been.calledOnce;
    });
  });
});

function defaultProps() {
  return {
    actions: { // :off
      handleShiftLeft: jasmine.createSpy(),
      handleShiftRight: jasmine.createSpy(),
      handleShiftUp: jasmine.createSpy(),
      handleShiftDown: jasmine.createSpy(),
      handleNewGame: jasmine.createSpy(),
    },  // :on

    value: 2,

    tiles: Set(),
  };
}
