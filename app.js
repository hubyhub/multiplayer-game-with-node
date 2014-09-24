var express, app, server, io, game;

express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
game = require('./game.js');


// Create Webserver
server.listen(3000);
console.log("Server is listening on http://localhost:3000...");
app.get('/', function(req, res){
	res.sendfile(__dirname +'/index.html');
});

// Create Websocket-Connections
var numberOfPushConnections = 0;
io.sockets.on('connection', function(socket){

    numberOfPushConnections++;

    console.log("A client is now connected", numberOfPushConnections);

    socket.on('player-input', function(data){
        io.sockets.emit('update-scene', data.name+"a");
    });

    socket.on('move', function(data){
        game.move();
        console.log(data);
    });

    socket.on('disconnect', function () {
        numberOfPushConnections--;
        console.log("A client has closed the connection.", numberOfPushConnections);
    });

});

