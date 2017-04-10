const Bermuda = require('../crawlers/bermudabraeu.js');
const JonathanSieglinde = require('../crawlers/jonathan-sieglinde.js');
const Ramien = require('../crawlers/ramien.js');
const NeuDeli = require('../crawlers/neudeli.js');

const restaurants = [
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

exports.getRestaurantFromMessage = function (message) {
  for (let i in restaurants) {
    if (message.indexOf(restaurants[i].name) !== -1) {
      return restaurants[i].callback;
    }
  }

  return false;
};


exports.getListOfRestaurants = function () {
  let list = '\n';

  for (let i in restaurants) {
    list += '- ' + restaurants[i].name + '\n';
  }

  return list;
};

exports.isValidMessage = function (message) {
  const phrases = [
    'What\'s for lunch',
    'I\'m hungry',
    'I am hungry',
    'What is for lunch',
    'What are my options today'
  ];

  return phrases.some(
    function (p) {
      let regex = new RegExp(p, 'i'); //match case insensitive
      let match = message.match(regex);
      return match !== null && match.length > 0;
    }
  );

};
