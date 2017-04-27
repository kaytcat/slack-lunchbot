'use strict';

const restaurants = require('./restaurants.js');
const Bot = require('slackbots');

const token = process.env.BOT_API_KEY || require('../token');
const settings = {
  token,
  name: 'munchbot-tester'
};
const LunchBot = new Bot(settings);
const channels = LunchBot.getChannels();
const defaultChannelName = 'lunch';


LunchBot.on('message', function (data) {
  let message = data.text || '';
  let channelId = data.channel;

  if (restaurants.isValidMessage(message)) {
    respondToMessage(message, channelId);
  }
});

function respondToMessage(message, channelId) {

  let restaurant = restaurants.getRestaurantFromMessage(message);

  if (!restaurant) {
    return postMessage("Which restaurant would you like to visit?" + restaurants.getListOfRestaurants(), channelId);
  }

  return restaurant
    .getMenu()
    .then(res => postMessage(res, channelId))
    .catch(err => console.error(err));
}

function postMessage(message, channelId) {
  LunchBot.postMessage(channelId, message, {'as_user': true}, function (err) {
    console.log(err);
  });
}

function getChannel(id) {
  const channel = channels._value.channels.find(channel => channel.id === id);
  return channel ? channel.name : defaultChannelName;
}
