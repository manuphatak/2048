/* global describe, it */
import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';
import { Game} from './Game.jsx';

describe('Game', () => {
  it('renders a set of buttons', () => {
    const component = renderIntoDocument((
      <Game />
    ));
  });
});
