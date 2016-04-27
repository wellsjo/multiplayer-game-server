var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

io.on('connection', function (socket) {

  console.log('hello world');

  socket.on('my other event', function (data) {
    console.log(data);
  });

});
