(function() {
    var position, movement;

    position = {};
    position.x = 0;
    position.y = 0;
    movement = { up:false,down:false,left:false,right:false};

    module.exports.updateUserInput = function(data) {

        if(data.indexOf("null") != -1)
        {
            movement.up = false;
            movement.down = false;
            movement.left = false;
            movement.right= false;
            return;
        }

        movement.up = data.indexOf("u") != -1 ? true : false;
        movement.down = data.indexOf("d") != -1 ? true : false;
        movement.left = data.indexOf("l") != -1 ? true : false;
        movement.right = data.indexOf("r") != -1 ? true : false;
        console.log(movement);

    }



}());


