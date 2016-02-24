/* eslint-env jasmine */
/* global beforeEach, jasmine, JSON */

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

require('./src/lib/immutable');

beforeEach(() => {
  jasmine.addCustomEqualityTester(immutableEquality);
  jasmine.addMatchers(getImmutableMatcher());
});

const context = require.context('./src', true, /^.+\.(?:spec|helper)\.[jt]sx?$/);
context.keys().forEach(context);

import { Iterable, is } from 'immutable';

/**
 * Use immutable equality when left and right are immutable.
 *
 * @param {*} left
 * @param {*} right
 * @returns {(boolean|undefined)}
 */
function immutableEquality(left, right) {
  if (Iterable.isIterable(left) && Iterable.isIterable(right)) {
    return is(left, right);
  }

  return undefined;
}

function getImmutableMatcher() {
  return {
    /**
     * Custom matcher factory.
     *
     * @param {object} util
     * @param {object} [customEqualityTesters]
     * @returns {object} custom matcher
     */
    toEqualImmutable(util, customEqualityTesters) {
      return {

        /**
         * Compare immutable objects and describe cause for failure.
         *
         * @param {immutable.Iterable} actual
         * @param {immutable.Iterable} expected
         * @returns {{pattern: RegExp, message: string, pass: boolean}}
         */
        compare(actual, expected) {
          // setup
          const result = { // :off
            // required for the diff tool.
            pattern: /Expected ([\S\s]*) to equal ([\S\s]*)\./,
            message: '',
            pass: false,
          }; // :on
          const messages = [];

          try {
            // test equality
            result.pass = util.equals(actual, expected, customEqualityTesters);

            // create the failure message
            if (!result.pass) {
              const [actualString, expectedString] = [actual.toJS(), expected.toJS()].map(JSON.stringify);
              messages.push(`Expected ${actualString} to equal ${expectedString}.`);
            }
          }
          catch (error) { // objects were not immutable
            result.pass = false;

            // check both are immutable, create a message detailing results.
            if (!Iterable.isIterable(actual)) {
              messages.push(`Actual: ${JSON.stringify(actual)} is not immutable.`);
            }

            if (!Iterable.isIterable(expected)) {
              messages.push(`Expected: ${JSON.stringify(expected)} is not immutable.`);
            }

            messages.push(`Error: ${error.message}`);
          }

          // combine messages
          result.message = messages.join(('\n'));

          return result;
        },
      };
    },
  };
}
