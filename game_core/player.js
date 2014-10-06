(function(exports){
    var pos = {x : 0, y : 0};

    // your code goes here

    exports.run = function(){
        console.log("running");
        return 'player lauft auf server and client'
    };

})(typeof exports === 'undefined'? this['player']={}: exports);
