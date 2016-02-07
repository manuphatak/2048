/* global describe, it */
import { expect } from 'chai';

describe('routes-loader', () => {
  it('Should load a list of routes', done => {
    this.cacheable = () => ({});
    this.async = () => (err, result) => {
      expect(err).to.be.null; // eslint-disable-line no-unused-expressions
      expect(result).to.not.to.be.empty.and.have.all.keys('/', '/404', '/500');
      done();
    };

    require('./routes-loader').call(this);
  });
});
