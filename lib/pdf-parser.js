let fs = require('fs');
let PDFParser = require('pdf2json');

function pdf2txt (file, callback) {
    let pdfParser = new PDFParser(this,1);

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        callback(pdfParser.getRawTextContent());
    });

    pdfParser.loadPDF(file);
}

module.exports.pdf2txt = pdf2txt;
