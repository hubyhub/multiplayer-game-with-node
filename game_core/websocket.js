(function() {
    player = require('player.js');
    module.exports.start = function(io) {

        // create web-socket connections
        var numberOfPushConnections = 0;
        var possibleUserActions = ["u","d","l","r","null"];
        io.sockets.on('connection', function(socket){

            numberOfPushConnections++;


            console.log("A client is now connected", numberOfPushConnections);

            // SEND MESSAGE TO PLAYERS
            socket.on('player-input', function(data){
                io.sockets.emit('update-scene', data.name+"a");
            });

            // UPDATE player
            // TODO: SECURITY CHECK! make sure there is no rubbish, hackes in "data". Limit it to an array of userActions
            // array has allowed "userActsions"
            socket.on('move', function(data){

                if(Array.isArray(data) && data.length <= possibleUserActions.length ){
                    player.updateUserInput(data);
                }
                else{
                    console.log("Please don't try to hack me!");
                }
            });

            socket.on('disconnect', function () {
                numberOfPushConnections--;
                console.log("A client has closed the connection.", numberOfPushConnections);
            });

        });

    }

}());


