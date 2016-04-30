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

// waitroom / connection logic
io.on('connection', socket => {

  console.log('new connection');

  socket.on('disconnect', _ => {
    console.log('disconnected');
  });

  socket.on('error', e => {
    console.log('error', e);
  });

  if (!waitroom.length) {

    // user is waiting for a match
    console.log('connection waiting')
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
