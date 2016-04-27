'use strict'

const io = require('socket.io-client');
const socket = io('127.0.0.1:3000');

socket.on('connect', _ => {
  socket.emit('ping');
});

socket.on('pong', data => {
  socket.emit('ping');
});
