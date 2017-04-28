const restaurants = require('../lib/restaurants.js');
const should = require('should');

describe('#getListOfRestaurants()', function () {
  it('respond with list of restaurants', function () {
    restaurants.getListOfRestaurants().should.equal('\n- Bermuda Bräu\n- Jonathan Sieglinde\n- Ramien\n- Neudeli\n');
  });
});

describe('#isValidMessage() with empty string', function () {
  it('responds with false', function () {
    restaurants.isValidMessage('').should.be.false();
  });
});

describe('#isValidMessage() with exact match', function () {
  it('responds with true', function () {
    restaurants.isValidMessage('What is for lunch').should.be.equal(true);
  });
});

describe('#isValidMessage() with lowercase string', function () {
  it('responds with true', function () {
    restaurants.isValidMessage('what is for lunch').should.be.equal(true);
  });
});

describe('#isValidMessage() with other string', function () {
  it('responds with true', function () {
    restaurants.isValidMessage('what\'s for lunch?').should.be.equal(true);
  });
});