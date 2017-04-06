let format = require('date-fns/format');
let addDays = require('date-fns/add_days');
let pdf2text = require('../lib/pdf-parser.js');
let download = require('download-file');

function getMenu (callback) {
    let url = 'http://neudeli.at/wp-content/uploads/2016/10/Wochenkarte-kw42.pdf';
    let options = {
        directory: "./tmp/",
        filename: "neudeli.pdf"
    };

    download(url, options, function (err) {
        if (err) throw err;

        pdf2text.pdf2txt(options.directory + options.filename, function (text) {
            let today = new Date();
            let todayString = format(today,'DD.MM');
            let tomorrowString = format(addDays(today,1),'DD.MM');

            let todaysMenu = text.substring(text.lastIndexOf(todayString), text.lastIndexOf(tomorrowString));

            callback(todaysMenu);

        });
    });
}

module.exports = {
    getMenu: getMenu
};