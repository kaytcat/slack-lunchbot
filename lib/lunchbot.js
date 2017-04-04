'use strict';

var Bot = require('slackbots');
var token = process.env.BOT_API_KEY || require('../token');

var settings = {
  token,
  name: 'munchbot'
}

var LunchBot = new Bot(settings);

LunchBot.on('start', function() {
  this.postMessageToChannel('hackday-lunchbot', 'MEOW MEOW!');
});
