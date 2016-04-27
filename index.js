'use strict'

const server = require('./server');

server.io.on('connection', socket => {

  socket.on('ping', data => {
    console.log('receive ping');
    console.log('data: ' + data);
    console.log('send pong');
    socket.emit('pong');
  });

});
