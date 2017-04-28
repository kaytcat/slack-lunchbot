const should = require('should');
const Neudeli = require('./../../crawlers/neudeli.js');

describe('#getMenu() from Neudeli', function () {
  it('responds with menu', function () {
    return Neudeli.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});