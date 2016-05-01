/**
 * Match class
 */

'use strict'

/**
 * A single match between two players
 */

class Match {

  /**
   * @constructor
   * @param {SocketIO} io Socket.io connection object
   * @param {String} map The map name
   * @param {Socket} p1 Player 1 socket
   * @param {Socket} p2 Player 2 socket
   */

  constructor(io, room, map, p1, p2) {
    p1.join(room);
    p2.join(room);
    p1.on('action', a => this.action(a));
    p2.on('action', a => this.action(a));
    this.map = require(`../maps/${map}.json`);
    this.room = room;
    this.p1 = p1;
    this.p2 = p2;
    this.io = io;
    this.io.to(room).emit('matchfound', JSON.stringify(this.map));
    console.log('match started');
  }

  /**
   * Accept actions made from the clients and broadcast them back out.
   * Lockstep synchronization is used to keep moves done in parallel.
   * @param {Object} a The action to perform on state
   */

  action(a) {

    // broadcast and update state
    console.info('action', a);
    this.io.to(this.room).emit('action', a);
  }
}

module.exports = Match;
