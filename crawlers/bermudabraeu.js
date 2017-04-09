var Crawler = require("crawler");
var url = require('url');

var c = new Crawler();

module.exports.getMenu = function getMenu () {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: 'http://www.bermuda-braeu.at/en/',
            jQuery: true,

            // The global callback won't be called
            callback: function (error, res, done) {

                if (error) {
                    reject(error);
                } else {

                    var d = new Date();
                    var weekday = new Array(7);
                    weekday[1] = "Montag";
                    weekday[2] = "Dienstag";
                    weekday[3] = "Mittwoch";
                    weekday[4] = "Donnerstag";
                    weekday[5] = "Freitag";
                    weekday[6] = "Tagesteller";//there is no saturday in the text

                    var day = d.getDay();
                    if (day <= 0 ) day = 1; //does not work for sunday
                    var today = weekday[day];
                    var dayTom = day + 1;
                    if (dayTom > 6) dayTom = 6; //not sure if it could be ever > 6
                    var end = weekday[dayTom];

                    var $ = res.$;
                    // $ is Cheerio by default
                    //a lean implementation of core jQuery designed specifically for the server
                    var menutext = $("div[class='col-md-4 menu-text']").text();
                    var todaysMenu = menutext.substring(menutext.lastIndexOf(today), menutext.lastIndexOf(end));

                    resolve(todaysMenu);
                }

                done();
            }
        }])
    });
}
