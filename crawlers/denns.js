const pdf2text = require('../lib/pdf-parser.js');
const download = require('download-file');

const DateFns = require('date-fns');


function downloadFile(url, options) {
  return new Promise((resolve, reject) => {
    download(url, options, function (err) {
      if (err) reject(err);

      resolve();
    })
  })
}

module.exports.getMenu = async function getMenu(date = new Date()) {

  const url = 'http://www.denns-biomarkt.at/file/23308_Mittagsmen%C3%BC%20Wien%20Singerstr.pdf';

  const options = {
    directory: "./tmp/",
    filename: "denns.pdf"
  };

  const todayString = getDayFormatted(date);
  const tomorrowString = getDayFormatted(DateFns.addDays(date, 1));

  try {
    await downloadFile(url, options);

    let text = await pdf2text.pdf2txt(options.directory + options.filename);

    return camelCaseToWords(text.substring(text.indexOf(todayString), text.lastIndexOf(tomorrowString))).concat('\n',url);

  } catch (err) {
    throw err;
  }
};

function camelCaseToWords(str){
  return str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/-  /g, "-").replace(/  /g, ' ');
}


function getDayFormatted(date) {
  if (DateFns.isMonday(date)) return "Mo";
  if (DateFns.isTuesday(date)) return "Di";
  if (DateFns.isWednesday(date)) return "Mi";
  if (DateFns.isThursday(date)) return "Do";
  if (DateFns.isFriday(date)) return "Fr";
  if (DateFns.isSaturday(date)) return "Sa";
  if (DateFns.isSunday(date)) return "GutenAppetitwünschtIhnenIhrdenn";
}