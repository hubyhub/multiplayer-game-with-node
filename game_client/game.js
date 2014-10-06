// The Module Pattern - create an object without the possibility to create new instances
var Game = (function() {
    // private

    // exposed to public
    return {
        start: function() {
            Socket.connect();

        },
        stop: function(){
            Socket.disconnect();
        },
        pause: function(){

        }
    }
}());






// Mocking

setTimeout(function(){
    Game.start();
}, 1000)


setTimeout(function(){
    Game.stop();
}, 116000)



setInterval(function() {
    Socket.sendPing();
}, 2000);