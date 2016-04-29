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
  if (!waitroom.length) {
    waitroom.push(socket);
  } else {
    let p1 = waitroom.pop();
    let p2 = socket;
    matches.push(new Match(p1, p2, matches.length));
  }
});
