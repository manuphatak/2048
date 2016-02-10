/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import routesLoader from './routes-loader';

describe('routes-loader', () => {
  it('Should load a list of routes', function test(done) {
    this.cacheable = () => ({});
    this.async = () => (err, result) => {
      expect(err).to.be.null;
      expect(result).to.not.to.be.empty.and.have.all.keys('/', '/404', '/500');
      done();
    };

    routesLoader.call(this, 'const routes = {};');
  });
});
