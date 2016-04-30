'use strict'

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', _ => {
  console.log('connected to server');
});

socket.on('waiting', _ => {
  console.log('waiting for match');
});

socket.on('matchfound', _ => {

  console.log('match found');

  setTimeout(_ => {
    socket.emit('action', 'move');
  }, 1000);

  setTimeout(_ => {
    socket.emit('action', 'build');
  }, 2000);
});
