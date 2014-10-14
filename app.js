var express, app, server, io, websocket;
express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
websocket = require("./game_server/websocket.js");

// create web-server
server.listen(3000);

console.log("Server is listening on http://localhost:3000...");

// serve statics
app.use("/game_client", express.static(__dirname + '/game_client'));
app.use("/game_core", express.static(__dirname + '/game_core'));
// the initial html
app.get('/', function(req, res){
	res.sendfile(__dirname +'/index.html');
});

/*app.get('/game_client/keyboard.js', function(req, res){
    res.sendfile(__dirname +'/game_client/'+keyboard.js);
});*/

// Listen for websocket-connections
websocket.start(io);

