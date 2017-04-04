var dl = require("../download.js");
var url = 'http://neudeli.at/wp-content/uploads/2016/10/Wochenkarte-kw42.pdf';
var converter = require("../pdf-parser.js");


var pdf = dl.downloadPDF(url);
console.log(pdf);
var txt = converter.convert2txt(pdf);
console.log(txt);
