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
    callback: ''
  },
  {
    name: 'Enwok',
    callback: ''
  }
];

var LunchBot = new Bot(settings);

// LunchBot.on('start', function() {
//   this.postMessageToChannel('hackday-lunchbot', 'MEOW MEOW!');
// });

LunchBot.on('message', function(data) {
  var message = data.text || '';

  if (isValidMessage(message)) {
    var response = respondToMessage(message);
    this.postMessageToChannel('hackday-lunchbot', response);
  }

});

function respondToMessage (message) {
  var listOfRestaurants = getListOfRestaurants();
  var response = "Which restaurant would you like visit?" + listOfRestaurants;
  var restaurantMenu = getRestaurantFromMessage(message);

  if (restaurantMenu) {
    var response = restaurantMenu;
  }

  return response;
}

function getRestaurantFromMessage (message) {
  for (var i in restaurants) {
    if (message.indexOf(restaurants[i].name)) {
      return restaurants[i].callback;
    };
  }

  return false;
}

function getMenu (restaurant) {

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
