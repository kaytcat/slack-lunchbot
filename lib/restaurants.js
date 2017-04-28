const Bermuda = require('../crawlers/bermudabraeu.js');
const JonathanSieglinde = require('../crawlers/jonathan-sieglinde.js');
const Ramien = require('../crawlers/ramien.js');
const NeuDeli = require('../crawlers/neudeli.js');
const Denns = require('../crawlers/denns.js');

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
  },
  {
    name: 'Denns',
    callback: Denns
  }
];

exports.getRestaurantFromMessage = function (message) {

  let n = message.lastIndexOf('at ');
  let search = message.substring(n +3);
  let regex = new RegExp(search, 'i'); //match case insensitive


  restaurant = restaurants.find(
    function (restaurant) {
      let match = restaurant.name.match(regex);
      return match !== null && match.length > 0;
    }
  );

  if (restaurant !== undefined) {
    return restaurant.callback;
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
    'What are my options today',
    'whats for lunch'
  ];

  return phrases.some(
    function (p) {
      let regex = new RegExp(p, 'i'); //match case insensitive
      let match = message.match(regex);
      return match !== null && match.length > 0;
    }
  );

};
