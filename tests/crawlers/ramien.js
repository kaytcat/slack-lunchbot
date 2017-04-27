const should = require('should');

const Ramien = require('./../../crawlers/ramien.js');
describe('#getMenu() from Ramien', function () {
  it('responds with menu', function () {
    return Ramien.getMenu().then(function (data) {
      console.log(data);
      data.should.not.be.empty();
    })
  });
});
