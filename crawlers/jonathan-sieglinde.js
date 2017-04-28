const Crawler = require("crawler");
const DateFns = require('date-fns');

const c = new Crawler();

module.exports.getMenu = function getMenu() {
  return new Promise((resolve, reject) => {
    let menuLink = 'http://jonathan-sieglinde.com/mittags-speiseplan.htm';
    c.queue([{
      uri: menuLink,
      jQuery: true,

      // The global callback won't be called
      callback: function (error, res, done) {

        if (error) {
          reject(error);
        } else {

          let $ = res.$;
          // $ is Cheerio by default
          //a lean implementation of core jQuery designed specifically for the server
          let menutext = $("table td").text();


          let today = new Date();
          let firstDay = DateFns.format(DateFns.startOfWeek(today, {weekStartsOn: 1}), 'D.M');
          let weekFrom = 'Woche vom ' + firstDay;

          let nextWeek = DateFns.addDays(today, 7);
          let firstDayNW = DateFns.format(DateFns.startOfWeek(nextWeek, {weekStartsOn: 1}), 'D.M');
          let weekUntil = 'Woche vom ' + firstDayNW;
          let thisWeeksMenu = menutext.substring(menutext.lastIndexOf(weekFrom), menutext.lastIndexOf(weekUntil));

          //todo: different logic for last week in month

          let d = new Date();
          let weekday = new Array(7);
          weekday[1] = "Mo:";
          weekday[2] = "Di:";
          weekday[3] = "Mi:";
          weekday[4] = "Do:";
          weekday[5] = "Fr:";
          weekday[6] = "€";//there is no saturday in the text

          let day = d.getDay();
          if (day <= 0) day = 1; //does not work for sunday
          let todayString = weekday[day];
          let dayTom = day + 1;
          if (dayTom > 6) dayTom = 6; //not sure if it could be ever > 6
          let endString = weekday[dayTom];

          let todaysMenu = thisWeeksMenu.substring(
            thisWeeksMenu.lastIndexOf(todayString),
            thisWeeksMenu.lastIndexOf(endString)
          );

          todaysMenu += '\n' + menuLink;

          resolve(todaysMenu);
        }

        done();
      }

    }])
  });

};
