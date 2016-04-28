'use strict'

const config = require('./config');
const map = require('./maps/1.json');
const io = require('./server');

io.on('connection', socket => {

  console.log('connection');

  socket.on('ping', data => {
    console.log('ping');
    socket.emit('pong');
  });

});
