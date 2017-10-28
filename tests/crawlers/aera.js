// http://www.lewei.at/mittagsmenues/

const should = require('should');

const crawler = require('./../../crawlers/aera.js');
describe('#getMenu() from Lewei', function () {
    it('responds with menu', function () {
        return crawler.getMenu().then(function (data) {
            console.log(data);
            data.should.not.be.empty();
        })
    });
});
