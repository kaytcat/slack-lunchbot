// http://www.lewei.at/mittagsmenues/

const should = require('should');

const crawler = require('./../../crawlers/dasheinz.js');
describe('#getMenu() from das heinz', function () {
    it('responds with menu', function () {
        return crawler.getMenu().then(function (data) {
            console.log(data);
            data.should.not.be.empty();
        })
    });
});
