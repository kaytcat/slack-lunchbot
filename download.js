module.exports = {
  downloadPDF: function(link) {

    var download = require('download-pdf')

    var pdf = link;

    var n = pdf.lastIndexOf('/');
    var cutname = pdf.substring(n + 1);

    var options = {
        directory: "./pdf-db",
        filename: cutname
    }

    download(pdf, options, function(err){
        if (err) throw err
        console.log("File downloaded");
    })

    return options;
  }
};
