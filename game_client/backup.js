
var socket = io.connect();
var Player = {};
var sessionId;
var Keyboard = {};
var Game = {};
Keyboard.pressedKeys = [];
Keyboard.allowedKeys = [65, 68, 83, 87];  		// For i18n the user should be able to map these keys to his own needs. (WASD-keys atm.)
Game.mappedAction = ['l', 'r', 'd', 'u'];		// Instead of key-codes, "ACTIONS" will be sent to the server. (LEFT, RIGHT, DOWN, UP)
Game.currentActions = [];


// User has (re)connected to socket.io
socket.on('connect',function() {
    sessionId = socket.io.engine.id;

    if( isPlaying() ){
        reconnect(sessionId);
    }
    else {
        createNewPlayer();       // bzw join new game?
    }

});

function processKeyDownEvent(e){
    if(!Keyboard.pressedKeys[e.which] && isAllowedKey(e.which) ){
        Keyboard.pressedKeys[e.which] = 1;
        sendCurrentActionsToServer()
    }
}

function processKeyUpEvent(e){
    if(isAllowedKey(e.which) ){
        Keyboard.pressedKeys[e.which] = 0;
        sendCurrentActionsToServer()
    }
}

function isAllowedKey(key){
    if(Keyboard.allowedKeys.indexOf(key) != -1){
        return true;
    }
    return false;
}

// possible outputs: l,r,u,d,null
function mapKeyCodesToActions(){

    for(var i=0; i < Keyboard.allowedKeys.length; i++){
        if(Keyboard.pressedKeys[Keyboard.allowedKeys[i]]){
            Game.currentActions.push(Game.mappedAction[i]);
        }
    }

    if(Game.currentActions.length == 0){
        Game.currentActions.push("null");               // "null" is sent, when all keys have been released.
    }
}

function sendCurrentActionsToServer(){
    mapKeyCodesToActions();
    console.log("Sending these actions to the server: ", Game.currentActions);
    socket.emit('move', Game.currentActions);
    //socket.emit('move', ["xxx","xxx","xxx","xxx"]);
    Game.currentActions = [];  // clear array
}


function createNewPlayer(){
    Player.name = prompt("Please enter your name:", "");
    socket.emit("new-player",{name: Player.name},
// callback
        function(confirmation){
            if(confirmation){
                setCookie("gamesession", sessionId, 300);
                console.log("Player '"+ Player.name+ "' successfully created.");
                //Later: show user stadiums
                //Now: autojoin to game.
                joinGame();
            }
            else{
                console.log("Couldn't create a new Player. Please try again later.");
            }
        }
    );
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("gamesession");
    if (user != "") {

    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


function reconnect(sessionId){
    var gameSession= getCookie("gamesession");

    console.log("reconnecting...to: ", gameSession);
    socket.emit("try-reconnect", {"gameSession" : gameSession}, function(playerFromServer){
        if(!playerFromServer){
            // TODO: create Player
            console.log("create player",playerFromServer);
            createNewPlayer();
        }
        else{
            // resume
            console.log("Got this player: " + playerFromServer);
        }
    });

// getName
// position
}

function joinGame(){
    // addPlayer
    document.onkeydown = processKeyDownEvent;
    document.onkeyup = processKeyUpEvent;
}

function isPlaying(){
    var user = getCookie("gamesession");
    if (user != "") {
        // TODO: check on the server whether the same gamesession is also present!! if yes, return true!
        return true;
    } else {
        return false;
    }
}






