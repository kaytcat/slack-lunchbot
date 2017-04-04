'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var Bot = require('slackbots');

var LunchBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'lunchbot';

    this.user = null;
};

util.inherits(LunchBot, Bot);

/**
 * Run the bot
 * @public
 */
LunchBot.prototype.run = function () {
    console.log('HEY YO');
    // LunchBot.super_.call(this, this.settings);

    // this.on('start', this._onStart);
    // this.on('message', this._onMessage);
};

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
LunchBot.prototype._onStart = function () {
    this._loadBotUser();
    this._firstRunCheck();
};


/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
LunchBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromLunchBot(message) &&
        this._isMentioningChuckNorris(message)
    ) {
        this._replyWithRandomJoke(message);
    }
};

module.exports = LunchBot;
