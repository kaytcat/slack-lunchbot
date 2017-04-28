const should = require('should');

const Jonathan = require('./../../crawlers/jonathan-sieglinde.js');
describe('#getMenu() from Jonathan', function () {
  it('responds with menu', function () {
    return Jonathan.getMenu().then(function (data) {
      console.log(data);
      data.should.not.be.empty();
    })
  });
});