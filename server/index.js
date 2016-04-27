'use strict'

// module dependencies
const config = require('../config');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const server = express();
const httpServer = http.createServer(server);
const io = socketio(httpServer);

server.io = io;
httpServer.listen(config.port);

module.exports = server;
