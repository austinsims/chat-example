var express = require('express');
var http = require('http');
var SocketioServer = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = new SocketioServer(server);

app.use(express.static(__dirname));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(3000, function() {
  console.log('listening on *:3000');
});
