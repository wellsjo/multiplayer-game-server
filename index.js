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

  if (!waitroom.length) {
    console.log('connection waiting')
    waitroom.push(socket);
    socket.emit('waiting');
  } else {
    let p1 = waitroom.pop();
    let p2 = socket;
    p1.emit('matchfound');
    p2.emit('matchfound');
    matches.push(new Match(p1, p2, matches.length));
  }
});
