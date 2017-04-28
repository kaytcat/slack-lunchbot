const should = require('should');
const Neudeli = require('./../../crawlers/denns.js');

describe('#getMenu() from Denns', function () {
  it('responds with menu', function () {
    return Neudeli.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});