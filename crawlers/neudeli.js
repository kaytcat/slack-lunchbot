const format = require('date-fns/format');
const addDays = require('date-fns/add_days');
const isFriday = require('date-fns/is_friday');
const getISOWeek = require('date-fns/get_iso_week');

const pdf2text = require('../lib/pdf-parser.js');
const download = require('download-file');


function downloadFile(url, options) {
  return new Promise((resolve, reject) => {
    download(url, options, function (err) {
      if (err) reject(err);

      resolve();
    })
  })
}

module.exports.getMenu = async function getMenu() {
  today = new Date();
  let week = getISOWeek(today);

  const url = 'http://www.neudeli.at/wp-content/uploads/Wochenkarte-kw'+week+'.pdf';

  const options = {
    directory: "./tmp/",
    filename: "neudeli.pdf"
  };

  try {
    await downloadFile(url, options);
    let text = await pdf2text.pdf2txt(options.directory + options.filename);

    const todayString = format(today, 'DD.MM');
    let tomorrowString = format(addDays(today, 1), 'DD.MM');
    let friday = isFriday(today);
    if (friday) {
      tomorrowString = 'FRISCHE PASTA handgemacht '
    }


    text = text.substring(text.lastIndexOf(todayString), text.lastIndexOf(tomorrowString));
    text = text + '\n' + url;
    return text;
  } catch (err) {
    throw err;
  }
};