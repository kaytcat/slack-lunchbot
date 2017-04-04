var Crawler = require("crawler");
var url = require('url');
var startOfWeek = require('date-fns/start_of_week');
var endOfWeek = require('date-fns/end_of_week');
var format = require('date-fns/format');
var addDays = require('date-fns/add_days');

var c = new Crawler();

// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'http://jonathan-sieglinde.com/mittags-speiseplan.htm',
    jQuery: true,

    // The global callback won't be called
    callback: function (error, res, done) {

        if (error) {
            console.log(error);
        } else {

            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            var menutext = $("table td").text();



            var today = new Date();
            var firstDay = format(startOfWeek(today, { weekStartsOn: 1}),'D.M');
            var weekFrom = 'Woche vom '+firstDay;

            var nextWeek = addDays(today, 7);
            var firstDayNW = format(startOfWeek(nextWeek, { weekStartsOn: 1}),'D.M');
            var weekUntil = 'Woche vom '+firstDayNW;
            var thisWeeksMenu = menutext.substring(menutext.lastIndexOf(weekFrom), menutext.lastIndexOf(weekUntil));

            //todo: different logic for last week in month

            var d = new Date();
            var weekday = new Array(7);
            weekday[1] = "Mo:";
            weekday[2] = "Di:";
            weekday[3] = "Mi:";
            weekday[4] = "Do:";
            weekday[5] = "Fr:";
            weekday[6] = "€";//there is no saturday in the text

            var day = d.getDay();
            if (day <= 0 ) day = 1; //does not work for sunday
            var todayString = weekday[day];
            var dayTom = day + 1;
            if (dayTom > 6) dayTom = 6; //not sure if it could be ever > 6
            var endString = weekday[dayTom];

            var todaysMenu = thisWeeksMenu.substring(
                thisWeeksMenu.lastIndexOf(todayString),
                thisWeeksMenu.lastIndexOf(endString)
            );

            console.log(todaysMenu)
        }

        done();

    }
}]);