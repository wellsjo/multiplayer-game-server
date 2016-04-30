'use strict'

class Match {

  /**
   * @constructor
   * @param {Socket} p1 Player 1 socket connection
   * @param {Socket} p2 Player 2 socket connection
   * @param {String} i The id of the room
   */

  constructor(io, room, p1, p2) {
    p1.join(room);
    p2.join(room);
    p1.on('action', this.handleAction);
    p2.on('action', this.handleAction);
    this.state = {};
    this.io = io;
    this.room = room;
    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * @param {Object} action The action to perform on state
   */

  handleAction(action) {

    // broadcast and update state
    console.log('action', action);
    this.io.to(this.room).emit('action', action);
  }

}

module.exports = Match;
