const fs = require('fs');
const PDFParser = require('pdf2json');
const pdfParser = new PDFParser(this,1);

module.exports.pdf2txt = function pdf2txt (file) {
  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));

    pdfParser.on("pdfParser_dataReady", pdfData => {
      resolve(pdfParser.getRawTextContent());
    });

    pdfParser.loadPDF(file);
  })
}
