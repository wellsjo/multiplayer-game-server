'use strict'

/**
 * A single match between two players
 */

class Match {

  /**
   * @constructor
   * @param {Socket} p1 Player 1 socket connection
   * @param {Socket} p2 Player 2 socket connection
   * @param {String} i The id of the room
   */

  constructor(io, room, name, p1, p2) {
    p1.join(room);
    p2.join(room);
    this.map = require(`../maps/${name}.json`);
    this.room = room;
    this.p1 = p1;
    this.p2 = p2;
    this.io = io;
    p1.on('action', a => this.handleAction(a));
    p2.on('action', a => this.handleAction(a));
    this.io.to(room).emit('matchfound', JSON.stringify(this.map));
    console.log('match started');
  }

  /**
   * @param {Object} action The action to perform on state
   */

  handleAction(action) {

    // broadcast and update state
    console.info('action', action);
    this.io.to(this.room).emit('action', action);
  }

}

module.exports = Match;
