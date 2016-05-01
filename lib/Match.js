/**
 * Match class
 */

'use strict'

const EventEmitter = require('events').EventEmitter;

/**
 * A single match between two players
 */

class Match extends EventEmitter {

  /**
   * @constructor
   * @param {SocketIO} io Socket.io connection object
   * @param {String} map The map name
   * @param {Socket} p1 Player 1 socket
   * @param {Socket} p2 Player 2 socket
   */

  constructor(io, id, map, p1, p2) {
    super();
    this.io = io;
    this.id = id;
    this.map = require(`../maps/${map}.json`);
    this.status = 'playing';
    this.socketInit(p1);
    this.socketInit(p2);
    this.io.to(id).emit('matchfound', JSON.stringify(this.map));
    console.info('match started');
  }

  /**
   * Initialize socket connection for each player
   * @param {Socket} socket
   */

  socketInit(socket) {
    socket.join(this.id);
    socket.on('action', a => this.action(a));
    socket.on('end', _ => this.end());
  }

  /**
   * Accept actions made from the clients and broadcast them back out.
   * Lockstep synchronization is used to keep moves done in parallel.
   * @param {Object} a The action to perform on state
   */

  action(a) {

    // broadcast and update state
    console.info('action');
    this.io.to(this.id).emit('action', a);
  }

  end() {
    this.emit('end');
  }
}

module.exports = Match;
