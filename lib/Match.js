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
    this.init(p1);
    this.init(p2);
    map = JSON.stringify(require(`../maps/${map}.json`));
    this.io.to(id).emit('matchfound', map);
  }

  /**
   * Initialize socket connection for each player
   * @param {Socket} socket The player's socket connection
   */

  init(socket) {
    socket.mid = this.id;
    socket.join(this.id);
    socket.on('action', a => this.io.to(this.id).emit('action', a));
    socket.on('disconnect', _ => this.io.to(this.id).emit('playerdisconnect'));
    socket.emit('id', socket.id);
  }
}

module.exports = Match;
