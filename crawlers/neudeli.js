var dl = require("../download.js");
var url = 'http://neudeli.at/wp-content/uploads/2016/10/Wochenkarte-kw42.pdf';
var converter = require("../pdf-parser.js");

module.exports = {
    getMenu: function (postMessage) {
        dl.downloadPDF(url, converter.convert2txt, postMessage);
    }
};
