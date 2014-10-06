// The Module Pattern - create an object without the possibility to create new instances
var Socket = (function() {
    // private
    var socket;
    var ping;
    var startTime;
    var latency;


    function onConnect(){
        console.log("connected");
        Keyboard.startProcessing();
        sendPing();
    }

    function onDisconnect(){
        console.log("disconnected");
        Keyboard.stopProcessing();
    }

    function onReconnecting(){
        console.log("reconnecting");
    }

    function sendPing(){
        startTime = Date.now();
        console.log("sending ping");
        socket.emit('ping');
    }

    function onPong(){
        console.log("received Pong");
        latency = Date.now() - startTime;
        console.log(latency);
    }

    // exposed to public
    return {
        connect: function() {
            socket = io.connect();
            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('reconnecting', onReconnecting);
            socket.on('pong', onPong);
           // socket.on('ping', onPing);
        },
        disconnect: function(){
            socket.disconnect();
        },
        sendPing: function(){
            sendPing();
        }

    }
}());



























