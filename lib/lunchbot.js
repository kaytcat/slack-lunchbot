'use strict';

var Bot = require('slackbots');
var Bermuda = require('../crawlers/bermudabraeu.js');
var JonathanSieglinde = require('../crawlers/jonathan-sieglinde.js');
var Ramien = require('../crawlers/ramien.js');
var NeuDeli = require('../crawlers/neudeli.js');


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
    callback: Bermuda
  },
  {
    name: 'Jonathan Sieglinde',
    callback: JonathanSieglinde
  },
  {
    name: 'Ramien',
    callback: Ramien
  },
  {
    name: 'Neudeli',
    callback: NeuDeli
  }
];

var LunchBot = new Bot(settings);

LunchBot.on('message', function(data) {
  var message = data.text || '';

  if (isValidMessage(message)) {
    respondToMessage(message, this);
  }
});

function respondToMessage (message, bot) {
  var listOfRestaurants = getListOfRestaurants();
  var response = "Which restaurant would you like visit?" + listOfRestaurants;
  var restaurantMenu = getRestaurantFromMessage(message, bot);

  if (restaurantMenu) {
    return restaurantMenu
      .callback
      .getMenu()
      .then(postMessage)
      .catch(err => console.error(err));
  }

  return postMessage(response);
}

function getRestaurantFromMessage (message, bot) {
  for (var i in restaurants) {
    if (message.indexOf(restaurants[i].name) !== -1) {
      return restaurants[i];
    };
  }

  return false;
}

function postMessage (message) {
  LunchBot.postMessageToChannel('lunch', message);
}

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
