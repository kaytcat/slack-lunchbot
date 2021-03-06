const Crawler = require("crawler");
const c = new Crawler();
const htmlToText = require('html-to-text');


module.exports.getMenu = function getMenu() {
    return new Promise((resolve, reject) => {
        const menuLink = 'https://www.dasheinz.at/menue';
        c.queue([{
            uri: menuLink,
            jQuery: true,

            // The global callback won't be called
            callback: function (error, res, done) {

                if (error) {
                    reject(error);
                } else {

                    const $ = res.$;
                    // $ is Cheerio by default
                    //a lean implementation of core jQuery designed specifically for the server
                    let menutext = $("section[class='content']").html();

                    var text = htmlToText.fromString(menutext, {
                        wordwrap: 130, ignoreImage: true, singleNewLineParagraphs: false
                    });

                    text = menuLink + '\n```' + text + '```' ;

                    resolve(text);
                }

                done();
            }
        }])
    });

};
