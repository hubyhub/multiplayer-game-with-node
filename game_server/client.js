// CLIENT MODULE
function Client( ) {
    //TODO: mapping player client
    console.log("New Client added");
    this.movement = { up:false,down:false,left:false,right:false};
}

Client.prototype.updateInputs = function(data) {
    if(data.indexOf("null") != -1)
    {
        this.movement.up = false;
        this.movement.down = false;
        this.movement.left = false;
        this.movement.right= false;
        return;
    }

    this.movement.up = data.indexOf("u") != -1 ? true : false;
    this.movement.down = data.indexOf("d") != -1 ? true : false;
    this.movement.left = data.indexOf("l") != -1 ? true : false;
    this.movement.right = data.indexOf("r") != -1 ? true : false;
    console.log(this.movement);
};


module.exports = Client;

