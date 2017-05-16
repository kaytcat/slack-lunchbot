const should = require('should');
const Denns = require('./../../crawlers/denns.js');

describe('#getMenu() from Denns', function () {
  it('responds with menu', function () {
    return Denns.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});
