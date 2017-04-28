const Crawler = require("crawler");
const c = new Crawler();

module.exports.getMenu = function getMenu() {
  return new Promise((resolve, reject) => {
    const menuLink = 'http://www.ramiengo.at/hoher-markt-speisen.html';
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
          let menutext = $("div[class='layout_speisekarte']").text();
          let thisWeeksMenu = menutext.substring(menutext.indexOf('WOCHENSPECIAL'), menutext.indexOf('NUDELSUPPEN')).replace(/(\r\n|\n|\r)/gm, "");

          thisWeeksMenu += '\n' + menuLink;
          resolve(thisWeeksMenu);
        }

        done();
      }
    }])
  });

};
