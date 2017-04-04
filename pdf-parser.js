let fs = require('fs'), PDFParser = require("pdf2json");
module.exports = {
  convert2txt: function(file) {

    let pdfParser = new PDFParser(this,1);
    try {
      var path = "../txt-db/";
      var pathpdf = "../pdf-db/";

      console.log(pathpdf+ file.filename);
      console.log("Creating txt...");
      console.log("////")
      console.log(path+ JSON.stringify(file.filename).replace(/['"]+/g, '') + ".txt");
      console.log("////")

      pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
      pdfParser.on("pdfParser_dataReady", pdfData => {
          fs.writeFile(path+ JSON.stringify(file.filename).replace(/['"]+/g, '') + ".txt", pdfParser.getRawTextContent());
      });

      pdfParser.loadPDF(pathpdf+ file.filename);

    } catch(e) {
      console.log(e);
    }
  }
}
