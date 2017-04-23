const Crawler = require("crawler");

const c = new Crawler();

module.exports.getMenu = function getMenu() {
  return new Promise((resolve, reject) => {
    c.queue([{
      uri: 'http://www.bermuda-braeu.at/en/',
      jQuery: true,

      // The global callback won't be called
      callback: function (error, res, done) {

        if (error) {
          reject(error);
        } else {
          let d = new Date();
          let weekday = new Array(7);
          weekday[1] = "Montag";
          weekday[2] = "Dienstag";
          weekday[3] = "Mittwoch";
          weekday[4] = "Donnerstag";
          weekday[5] = "Freitag";
          weekday[6] = "Tagesteller";//there is no saturday in the text

          let day = d.getDay();
          if (day <= 0) day = 1; //does not work for sunday
          let today = weekday[day];
          let dayTom = day + 1;
          if (dayTom > 6) dayTom = 6; //not sure if it could be ever > 6
          let end = weekday[dayTom];

          let $ = res.$;
          // $ is Cheerio by default
          //a lean implementation of core jQuery designed specifically for the server
          let menutext = $("div[class='col-md-4 menu-text']").text();
          let todaysMenu = menutext.substring(menutext.lastIndexOf(today), menutext.lastIndexOf(end));

          resolve(todaysMenu);
        }

        done();
      }
    }])
  });
};
