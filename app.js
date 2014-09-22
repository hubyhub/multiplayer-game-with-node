
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
    game = require('./game.js');


var numberOfConnections = 0;
server.listen(3000);
console.log("Server is listening on http://localhost:3000...");

app.get('/', function(req, res){
	res.sendfile(__dirname +'/index.html');
});

io.sockets.on('connection', function(socket){
    numberOfConnections++;
    console.log("A client is now connected", numberOfConnections);


    socket.on('player-input', function(data){

        io.sockets.emit('update-scene', data.name+"a");

        //io.broadcast.emit('update-players',data.name+"a");
    });

    socket.on('move', function(data){
        game.move();
        console.log(data);
    });


    socket.on('disconnect', function () {
        numberOfConnections--;
        console.log("A client has closed the connection.", numberOfConnections);
    });

});

//http://socket.io/docs/#using-with-node-http-server