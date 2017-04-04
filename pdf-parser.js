let fs = require('fs'), PDFParser = require("pdf2json");
module.exports = {
  convert2txt: function(file, callback) {

    var pdfParser = new PDFParser(this,1);
    try {
      console.log(file);

      pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
      pdfParser.on("pdfParser_dataReady", pdfData => {
          callback(pdfParser.getRawTextContent());
      });

      pdfParser.loadPDF(file);

    } catch(e) {
      console.log(e);
    }
  }
}
