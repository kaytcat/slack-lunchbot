const should = require('should');
const Bermuda = require('./../../crawlers/bermudabraeu.js');

describe('#getMenu() from Bermuda', function () {
  it('responds with menu', function () {
    return Bermuda.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});
