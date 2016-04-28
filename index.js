'use strict'

const config = require('./config');
const Match = require('./lib/match');
const map = require('./maps/1.json');
const io = require('./server');

const games = [];

io.on('connection', socket => {

  console.log('connection');

  socket.on('action', action => {
    socket.broadcast();
  });
});
