/**
 * Main server logic
 */

'use strict'

const Match = require('./lib/Match');
const io = require('./server');
const generateId = require('shortid').generate;

// waitroom and matches
const waitroom = [], matches = [];
setInterval(_ => console.info(matches.map(m => m.id)), 10000);

// on connection either start a match or enter a waitroom
io.on('connection', socket => {

  console.info('new connection');

  socket.on('disconnect', reason => {
    console.info('disconnected', reason);
  });

  if (!waitroom.length) {

    // enter waitroom
    waitroom.push(socket);
    socket.emit('waiting');
    console.info('connection waiting')
  } else {

    // start new match
    let p1 = waitroom.pop();
    let p2 = socket;
    let id = generateId();
    let match = new Match(io, id, 'map-1', p1, p2);
    matches.push(match);
    match.on('end', _ => {
      console.log('match ended');
    });
  }
});
