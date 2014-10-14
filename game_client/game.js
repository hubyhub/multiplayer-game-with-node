// The Module Pattern - create an object without the possibility to create new instances
var Game = (function() {
    // private

    // exposed to public
    return {
        start: function() {
            Socket.connect();
        },
        addPlayer: function(x,y,name){

            // adding player on field
            var manfred = new Player(0, 2, "id-asdfsdf", "manfreda");
            manfred.move();

            Socket.addPlayer("new-player", manfred);
            var hanswurst = new Player(0,2,"id-asdfsdf", "hans");
            hanswurst.move();
            Socket.addPlayer("new-player", hanswurst);


        },
        updateGameState: function(){
          //
            console.log("updating");
            
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
}, 100)

setTimeout(function(){
   // Game.addPlayer(12, 12, "Alien");
}, 1500)


setTimeout(function(){
    Game.stop();
}, 116000)



//setInterval(function() {
//    Socket.sendPing();
//}, 2000);