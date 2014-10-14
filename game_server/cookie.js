

var getCookie = function(ca, cname) {
    console.log("cookiiieie", ca);
    if( ca ) {
        var name = cname + "=";
        ca = ca.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
    }
    return "";
};

// making Player available in node.js
if(typeof exports !== 'undefined'){
    exports.getCookie = getCookie;
}







