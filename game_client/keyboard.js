// The Module Pattern - create an object without the possibility to create new instances
var Keyboard = (function() {
    // private
    var mapping = [[65,'l'],[68,'r'],[83,'d'],[87,'u']]; // For i18n the user should be able to map these keys to his own needs. (WASD-keys atm.)
    var pressedKeys = [];
    var userActions = [];

    function processKeyDownEvent(e){
        if(!pressedKeys[e.which] && isAllowedKey(e.which) ){
            pressedKeys[e.which] = 1;
            userActions = mapKeys();
            console.log(userActions);
        }
    }

    function processKeyUpEvent(e){
        if(isAllowedKey(e.which) ){
            pressedKeys[e.which] = 0;
            userActions = mapKeys();
            console.log(userActions);
        }
    }

    function isAllowedKey(key){
        for (var i = 0; i < mapping.length; i++) {
            if(mapping[i][0] == key){
                return true;
            }
        }
        return false;
    }

    // l,r,u,d,null
    function mapKeys(){
        userActions = [];  // clear array
        for(var i=0; i < mapping.length; i++){
            if(pressedKeys[mapping[i][0]]){
                userActions.push(mapping[i][1]);
            }
        }
        if(userActions.length == 0){
            userActions.push("null");               // "null" is sent, when all keys have been released.
        }
        return userActions;
    }

    // exposed to public
    return {
        startProcessing: function() {
            document.onkeydown = processKeyDownEvent;
            document.onkeyup = processKeyUpEvent;
        },
        stopProcessing: function(){
            document.onkeydown = null;
            document.onkeyup = null;
            // TODO: reset all values
        },
        setMapping: function(newMapping){
            mapping = newMapping;
            console.log(mapping);
        }
    }
}());

var newMapping = [[65,'l'],[66,'r'],[67,'d'],[68,'u']]; // For i18n the user should be able to map these keys to his own needs. (WASD-keys atm.)
//Keyboard.setMapping(newMapping);

//Keyboard.stopProcessing();




