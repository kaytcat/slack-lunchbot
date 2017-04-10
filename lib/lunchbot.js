'use strict';

const restaurants = require('restaurants.js');
const Bot = require('slackbots');

const token = process.env.BOT_API_KEY || require('../token');
const settings = {
  token,
  name: 'munchbot'
};


let LunchBot = new Bot(settings);

LunchBot.on('message', function (data) {
  let message = data.text || '';

  if (restaurants.isValidMessage(message)) {
    respondToMessage(message);
  }
});

function respondToMessage(message) {

  let restaurant = restaurants.getRestaurantFromMessage(message);

  if (!restaurant) {
    return postMessage("Which restaurant would you like to visit?" + restaurants.getListOfRestaurants());
  }

  return restaurant
    .getMenu()
    .then(postMessage)
    .catch(err => console.error(err));
}

function postMessage(message) {
  LunchBot.postMessageToChannel('lunch', message);
}