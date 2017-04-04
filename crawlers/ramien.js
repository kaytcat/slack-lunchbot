var Crawler = require("crawler");
var url = require('url');

var c = new Crawler();

module.exports = {
    getMenu: function (postMessage) {
        c.queue([{
            uri: 'http://www.ramiengo.at/hoher-markt-speisen.html',
            jQuery: true,

            // The global callback won't be called
            callback: function (error, res, done) {

                if (error) {
                    console.log(error);
                } else {

                    var $ = res.$;
                    // $ is Cheerio by default
                    //a lean implementation of core jQuery designed specifically for the server
                    var menutext = $("div[class='layout_speisekarte']").text();

                    var thisWeeksMenu = menutext.substring(menutext.indexOf('WOCHENSPECIAL'), menutext.indexOf('NUDELSUPPEN')).replace(/(\r\n|\n|\r)/gm,"");

                    postMessage(thisWeeksMenu);
                }

                done();
            }
        }])
    }
}
