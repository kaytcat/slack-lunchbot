const format = require('date-fns/format');
const addDays = require('date-fns/add_days');
const pdf2text = require('../lib/pdf-parser.js');
const download = require('download-file');

function downloadFile (url, options) {
	return new Promise((resolve, reject) => {
		download(url, options, function (err) {
      if (err) reject(err);

      resolve();
    })
	})
}

module.exports.getMenu = async function getMenu () {
  const url = 'http://neudeli.at/wp-content/uploads/2016/10/Wochenkarte-kw42.pdf';
  const options = {
      directory: "./tmp/",
      filename: "neudeli.pdf"
  };

  try {
		const fileDownloaded = await downloadFile(url, options);
		const text = await pdf2text.pdf2txt(options.directory + options.filename);
		const today = new Date();
		const todayString = format(today,'DD.MM');
		const tomorrowString = format(addDays(today,1),'DD.MM');
		const todaysMenu = text.substring(text.lastIndexOf(todayString), text.lastIndexOf(tomorrowString));
		return todaysMenu;
	} catch (err) {
		throw err;
	}
}