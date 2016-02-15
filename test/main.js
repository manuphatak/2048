import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiSinon from 'sinon-chai';
import '../src/lib/immutable';

chai.config.truncateThreshold = 0;

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
chai.use(chaiSinon);

const context = require.context('../src', true, /^.+\.(?:spec|helper)\.jsx?$/);

context.keys().forEach(context);
