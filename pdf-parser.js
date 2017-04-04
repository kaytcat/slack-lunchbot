let fs = require('fs'), PDFParser = require("pdf2json");
let pdfParser = new PDFParser(this,1);
try {
  const args = process.argv[2];
  console.log(args);
  var n = args.lastIndexOf('/');
  var cutname = args.substring(n + 1);
  var path = "./txt-db/";

  console.log("Creating txt...");

  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
      fs.writeFile(path+ cutname + ".txt", pdfParser.getRawTextContent());
  });

  pdfParser.loadPDF(args);

} catch(e) {
  console.log(e);
}
