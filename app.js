var express, app, server, io, websocket;

express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
websocket = require("websocket.js");

// create web-server
server.listen(3000);
console.log("Server is listening on http://localhost:3000...");
app.get('/', function(req, res){
	res.sendfile(__dirname +'/index.html');
});


// Listen for websocket-connections
websocket.start(io);

