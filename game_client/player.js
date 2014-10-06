// The Module Pattern - create an object without the possibility to create new instances

// TODO: maybe Object is better here?
var Player = (function() {
    // private
    //
    var pos = {x : 0, y : 0};
    var speed = {x : 0, y : 0};
    var message = "";

    // exposed to public
    return {
        run: function() {

        },
        shoot: function(){

        },
        foul: function(){

        },
        pass: function(){

        }
    }
}());