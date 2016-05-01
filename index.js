/**
 * Main server logic
 */

'use strict'

const config = require('./config');
const Match = require('./lib/Match');
const map = require('./maps/map-1.json');
const io = require('./server');

// array of games in memory
const matches = [];

// array of players awaiting connection
const waitroom = [];

// on connection either start a match or enter a waitroom
io.on('connection', socket => {

  console.info('new connection');

  socket.on('disconnect', reason => {
    console.info('disconnected', reason);
  });

  if (!waitroom.length) {

    // enter waitroom
    console.info('connection waiting')
    waitroom.push(socket);
    socket.emit('waiting');
  } else {

    // start new match
    let p1 = waitroom.pop();
    let p2 = socket;
    let room = new Date().getTime();
    matches.push(new Match(io, room, 'map-1', p1, p2));
  }
});
