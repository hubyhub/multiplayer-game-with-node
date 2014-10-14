
function Player(x,y, id, name) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    console.log("New Player created: ", this);
}

Player.prototype.move = function() {
    console.log(this.name + " is moving");
};

// making Player available in node.js
if(typeof exports !== 'undefined'){
    module.exports = Player;
}




