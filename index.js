/**
 * Main server logic
 */

'use strict'

const Match = require('./lib/Match');
const io = require('./server');
const gen = require('shortid').generate;

// waitroom and matches
const waitroom = [], matches = [];
setInterval(_ => console.info(matches.map(m => m.id)), 10000);

// on connection either start a match or enter a waitroom
io.on('connection', socket => {

  socket.id = gen();

  socket.on('disconnect', _ => {
    waitroom.filter(s => s.id = socket.id);
  });

  console.info('new connection');

  if (!waitroom.length) {

    // queue waitroom
    waitroom.push(socket);
    socket.emit('waiting');
    console.info('connection waiting')
  } else {

    // start match
    let match = new Match(io, gen(), 'map-1', waitroom.pop(), socket);
    matches.push(match);
    match.on('end', _ => {
      console.log('match ended');
    });
  }
});
