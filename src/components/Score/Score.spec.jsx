/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import { expect } from 'chai';
import Score from './Score';

describe('Score', () => {
  describe('render', () => {
    let props;
    let component;

    beforeEach(() => {
      props = defaultProps();
      component = renderIntoDocument((
        <Score {...props} />
      ));
    });

    it('uses score from props', () => {
      const score = findRenderedDOMComponentWithClass(component, 'score');
      expect(score.textContent).to.be.equal('0');
    });

    it('uses topScore from props', () => {
      const topScore = findRenderedDOMComponentWithClass(component, 'top-score');
      expect(topScore.textContent).to.be.equal('24');
    });
  });
});

function defaultProps(score = 0, topScore = 24) {
  return { score, topScore };
}
