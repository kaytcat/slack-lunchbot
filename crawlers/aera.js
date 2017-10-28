const Crawler = require("crawler");
const c = new Crawler();
const htmlToText = require('html-to-text');
const DateFns = require('date-fns');


module.exports.getMenu = function getMenu() {
    return new Promise((resolve, reject) => {
        const menuLink = 'https://www.aera.at/wochenmenue';
        c.queue([{
            uri: menuLink,
            jQuery: true,

            // The global callback won't be called
            callback: function (error, res, done) {
                let today = new Date();

                console.log(DateFns.format(today, 'dddd'));
                if (error) {
                    reject(error);
                } else {

                    const $ = res.$;
                    // $ is Cheerio by default
                    //a lean implementation of core jQuery designed specifically for the server
                    let menutext = $("div[id='main-content']").html();

                    var text = htmlToText.fromString(menutext, {
                        wordwrap: 130, ignoreImage: true, singleNewLineParagraphs: false, ignoreHref: true
                    });

                    const todayString = getDayFormatted(today);
                    let tomorrowString = getDayFormatted(DateFns.addDays(today,1));

                    text = text.substring(text.lastIndexOf(todayString), text.lastIndexOf(tomorrowString));

                    text = menuLink + '\n\n```\n' + text + '```' ;

                    resolve(text);
                }

                done();
            }
        }])
    });

};

function getDayFormatted(date) {
    if (DateFns.isMonday(date)) return "MONTAG";
    if (DateFns.isTuesday(date)) return "DIENSTAG";
    if (DateFns.isWednesday(date)) return "MITTWOCH";
    if (DateFns.isThursday(date)) return "FREITAG";
    if (DateFns.isFriday(date)) return "FREITAG";
    if (DateFns.isSaturday(date)) return "Wochenmenü als Adobe";
    if (DateFns.isSunday(date)) return "MONTAG";
}