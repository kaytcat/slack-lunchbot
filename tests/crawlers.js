const format = require('date-fns/format');
const should = require('should');

const Jonathan = require('./../crawlers/jonathan-sieglinde.js');
const Bermuda = require('./../crawlers/bermudabraeu.js');
const Neudeli = require('./../crawlers/neudeli.js');
const Ramien = require('./../crawlers/ramien.js');

describe('#getMenu() from Bermuda', function () {
  it('responds with menu', function () {
    return Bermuda.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});


describe('#getMenu() from Neudeli', function () {
  it('responds with menu', function () {
    return Neudeli.getMenu().then(function (data) {
      data.should.not.be.empty();
      console.log(data);
    })
  });
});

describe('#getMenu() from Jonathan', function () {
  it('responds with menu', function () {
    return Jonathan.getMenu().then(function (data) {
      console.log(data);
      data.should.not.be.empty();
    })
  });
});

describe('#getMenu() from Ramien', function () {
  it('responds with menu', function () {
    return Ramien.getMenu().then(function (data) {
      console.log(data);
      data.should.not.be.empty();
    })
  });
});
