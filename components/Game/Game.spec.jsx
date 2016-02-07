/* global describe, it */
import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';
import { List } from 'immutable';
import { Game } from './Game.jsx';

describe('Game', () => {
  it('renders a set of buttons', () => {
    const props = defaultProps();
    const component = renderIntoDocument((
      <Game {...props} />
    ));
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.be.equal(4);
  });
});

function defaultProps() {
  return {
    actions: {
      onShiftLeft: () => undefined,
      onShiftRight: () => undefined,
      onShiftUp: () => undefined,
      onShiftDown: () => undefined,
    },
    value: 2,
    tiles: List(),
  };
}
