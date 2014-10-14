(function() {
    var Player = require('../game_core/player.js');
    var Cookie = require('../game_server/cookie.js');
    var clients = {};
    var disconnectedClients = [];

    module.exports.start = function(io) {
    io.sockets.on('connection', onSocketConnection);

    // A client has connected
    function onSocketConnection(socket){
        addPlayer(socket);
        socket.on('disconnect', onClientDisconnect);
    }

    // use facebook/whatever id/cookie to identify the client
    function addPlayer(socket){
        var sessionId = getIdByCookie(socket.request.headers.cookie);

        if(sessionId != ""  ){
            var c = getClient(sessionId);
            if(c == null){
                createNewPlayer(socket.id);
                socket.emit("new-session", socket.id );
            }
            else{
                restoreClient(socket.id, c);
            }
        }
        else{
            createNewPlayer(socket.id);
        }

    }

    function restoreClient(socketId, c){
        console.log("restoring Client: ", c.id);
        
        clients[socketId] = c;
        delete clients[c.id];
        // removing client from disconnectedArray
        respawnClient(socketId);
    }


    function getClient(clientId){
         //console.log("RESTORE existing player"+ socketId);
         //check if session exists. if not create new pleyer
         for (var client in clients) {
             var c = clients[client];
             if(c.id == clientId){
                return c;
             }
         }
         return null;
    }

    function createNewPlayer(id){
        console.log("creating new Client + Player",id);
        var client = {};
        client.id  =  id;

        client.player = new Player(23, 23, id, "whatever-name");
        clients[id] = client;
    }




    //TODO: check if cookie is empty.. and so on
    function getIdByCookie(cookies){


        return Cookie.getCookie(cookies,"gamesession");

    }




    function onClientDisconnect(data){
       // console.log("trying to delete ",clients);

        var client = {};
        client.timestamp = Date.now();
        client.id = getClient(this.id);

        disconnectedClients.push(client);

      //  delete clients[this.id];

       // console.log("The client "+ this.id +" has closed the connection.\n Clients remaining: ", clients);
    }                                            clients

    function removeGoneClients(){
        var maxTimeWaiting = 10000;
        var disconnectedDuration = 0;
        var now = Date.now();
        console.log(disconnectedClients);
        var len = disconnectedClients.length;
        while (len--) {
            disconnectedDuration = now - disconnectedClients[len].timestamp ;

            console.log("disconnected for : "+ disconnectedDuration);
            if( disconnectedDuration > maxTimeWaiting){
                // remove Clients from array
                delete clients[disconnectedClients[len].id];
                disconnectedClients.splice(len,1);
            }
        }
    }

    function respawnClient(clientId){
        var len = disconnectedClients.length;
        while (len--) {
            console.log(disconnectedClients[len].id +"    "+ clientId);
            if(disconnectedClients[len].id === clientId){
                disconnectedClients.splice(len,1);
            }
        }
    }



    var cleanupInterval = setInterval(removeGoneClients, 2000);



    }



}());


