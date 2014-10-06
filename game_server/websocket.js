(function() {
    var Player = require('../game_core/player_old.js');

    module.exports.start = function(io) {

        // create web-socket connections
        var connections = 0;
        var possibleUserActions = ["u","d","l","r","null"];
        io.sockets.on('connection', onSocketConnection);
        var player;
        var players = [];
        var playersBlacklist = [];

        // A client has connected
        function onSocketConnection(socket){
            // console.log("read cookie: " +client.request.headers.cookie);
            connections++;

            socket.on('new-player', onNewPlayer);
            socket.on('try-reconnect', onReconnect);
            socket.on('move', onMovePlayer);
            socket.on('disconnect', onClientDisconnect);
            socket.on('ping', function() { socket.emit('pong');});

        }



        // Adds a new Player
        function onNewPlayer(data, callback){
            player = new Player(30,42, this.id, data.name);
            players.push(player);
            if(player){
                callback(true);
            }
            else{
                callback(false);
            }
        }

        // Sends Player back his data
        function onReconnect(data, callback){
               console.log("onreconnect");
               
            //TODO SEND PLAYER WITh data.session back
            for (var i = 0; i < players.length; i++) {
                if(data.sessionId == players[i].id){
                    // todo seccurity check
                    console.log("juhu player found: ",players[i]);
                    callback(players[i]);
                    return;
                }
                callback(false);
            }

            callback(player);
            //meanwhile sendback player
            console.log("new id is: " + this.id);
            console.log("however data.sessionId is: " + data.sessionId);
        }

        // TODO: SECURITY CHECK! make sure there is no rubbish, hacks in "data". // array has allowed "userActsions"
        function onMovePlayer(data){


            if(Array.isArray(data) && data.length <= possibleUserActions.length ){
                player.move();
                //ClientInput.update(data, id);
            }
            else{
                console.log("Please don't try to hack me!");
            }




            // TODO:
            // call player constructer
            // position Player
            // get Player id (client) Name. can be done only once.
            // store player in session
            // add player to players array
            //io.sockets.emit('update-scene', data.name+"a");

        }

        function onClientDisconnect(data){
            connections--;
            // The "this" object refers to the client variable from the onSocketConnection
            console.log("The client "+ this.id +" has closed the connection.", connections);
        }



    }

}());


