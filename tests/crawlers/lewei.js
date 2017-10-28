// http://www.lewei.at/mittagsmenues/

const should = require('should');

const Lewei = require('./../../crawlers/lewei.js');
describe('#getMenu() from Lewei', function () {
    it('responds with menu', function () {
        return Lewei.getMenu().then(function (data) {
            console.log(data);
            data.should.not.be.empty();
        })
    });
});
