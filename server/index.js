/**
 * Server initialization
 */

'use strict'

const config = require('../config');
const express = require('express');
const app = express();
const server = require('http').Server(app).listen(config.port);
const io = require('socket.io')(server);
console.info(`listening on port ${config.port}`);
module.exports = io;
