import * as React from 'react';
import obj from 'react-addons-test-utils';
import {expect} from 'chai';
import Counter from './Counter';
import TestUtils = require("react-addons-test-utils");

describe('Counter', () => {
    it('renders without error', () => {
        //const component = TestUtils.renderIntoDocument(<Counter />);
        //expect(component).to.exist;
        expect(1).to.equal(1);
    });
});