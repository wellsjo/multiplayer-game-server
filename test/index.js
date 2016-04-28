'use strict'

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', _ => {
  console.log('connect');
  socket.emit('ping', { message: 'hello' });
});

socket.on('pong', data => {
  console.log('pong recieved!');
  console.log('pong', data);
  socket.emit('ping', { message: 'hello' });
});
