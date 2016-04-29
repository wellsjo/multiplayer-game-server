'use strict'

class Match {

  /**
   * @constructor
   * @param {Socket} p1 Player 1 socket connection
   * @param {Socket} p2 Player 2 socket connection
   * @param {String} i The id of the room
   */

  constructor(p1, p2, room) {
    p1.join(room);
    p2.join(room);
    p1.on('action', this.handleAction);
    p2.on('action', this.handleAction);
    this.state = {};
    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * @param {Object} action The action to perform on state
   */

  handleAction(action) {
    // broadcast to players
    // update state
  }

}

module.exports = Match;
