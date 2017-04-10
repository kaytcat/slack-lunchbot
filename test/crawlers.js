const format = require('date-fns/format');
const should = require('should');




const Bermuda = require('./../crawlers/bermudabraeu.js');

describe('#getMenu() from Bermuda', function () {
  it('responds with menu', function () {
    return Bermuda.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});

const Neudeli = require('./../crawlers/neudeli.js');

describe('#getMenu() from Neudeli', function () {
  it('responds with menu', function () {
    return Neudeli.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});

const Jonathan = require('./../crawlers/jonathan-sieglinde.js');
describe('#getMenu() from Jonathan', function () {
  it('responds with menu', function () {
    return Jonathan.getMenu().then(function (data) {
      console.log(data);
      data.should.not.be.empty();
    })
  });
});
