module.exports = {
  downloadPDF: function(link, callback, callback2) {

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
        callback(options.directory+'/'+options.filename, callback2);
    })}
};
