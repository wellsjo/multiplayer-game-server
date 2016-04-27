'use strict'

// module dependencies
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const server = express();
const io = socketio(http.createServer(app));
server.io = io;

module.exports = server;
