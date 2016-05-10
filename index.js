/**
 * Main server logic
 */

'use strict'

const Match = require('./lib/Match');
const io = require('./server');
const gen = require('shortid').generate;

// waitroom and matches stored in memory
let waitroom = [], matches = [];

// on connection either start a match or enter a waitroom
io.on('connection', socket => {

  // give the socket (player) an id
  socket.id = gen();

  if (!waitroom.length) {

    // queue waitroom
    waitroom.push(socket);
    socket.emit('waiting');
  } else {

    // start match
    let match = new Match(io, gen(), 'map-1', waitroom.pop(), socket);
    matches.push(match);
    console.info(match);
  }

  // if a user disconnects, remove them from the waitroom
  socket.on('disconnect', _ => {
    waitroom = waitroom.filter(s => s.id != socket.id);
    matches = matches.filter(m => m.id != s.mid);
  });
});
