#!/usr/bin/env node
'use strict';

/**
 * kununu lunchbot launcher script.
 *
 */

var LunchBot = require('../lib/lunchbot');

var token = process.env.BOT_API_KEY || require('../token');

var lunchbot = new LunchBot({
    token: token
});

lunchbot.run();
