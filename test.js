let jonathan = require('./crawlers/jonathan-sieglinde.js');

jonathan.getMenu(function (message) {
    console.log(message);
});

let neudeli = require('./crawlers/neudeli.js');

neudeli.getMenu(function (message) {
    console.log(message);
});

let bermuda = require('./crawlers/bermudabraeu.js');
bermuda.getMenu(function (message) {
    console.log(message);
});