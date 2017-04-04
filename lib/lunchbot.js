'use strict';

var Bot = require('slackbots');
var token = process.env.BOT_API_KEY || require('../token');
var phrases = [
  'What is for lunch'
];

var settings = {
  token,
  name: 'munchbot'
}

var restaurants = [
  {
    name: 'Bermuda Bräu',
    menu: ''
  },
  {
    name: 'Enwok',
    menu: ''
  }
];

var LunchBot = new Bot(settings);

// LunchBot.on('start', function() {
//   this.postMessageToChannel('hackday-lunchbot', 'MEOW MEOW!');
// });

LunchBot.on('message', function(data) {
  var message = data.text || '';
  var listOfRestaurants = getListOfRestaurants();

  if (isValidMessage(message)) {

    this.postMessageToChannel('hackday-lunchbot', 'Which restaurant would you like visit?' + listOfRestaurants);
  }
});

function getListOfRestaurants () {
  var list = '\n';

  for (var i in restaurants) {
    list += '- ' + restaurants[i].name + '\n';
  }

  return list;
}

function isValidMessage(message) {
  return message.indexOf('What is for lunch') !== -1;
}
