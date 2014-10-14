var SessionHandler = (function() {
    // private

    function isPlaying(){
        var user = getCookie("gamesession");
        if (user != "") {
            return true;
        } else {
            return false;
        }
    }

    // exposed to public
    return {
        setSession: function(sessionId) {
            if(!isPlaying()){
                console.log("create new Session",sessionId);
                
                setCookie("gamesession", sessionId, 300);
            }
        },
        renewSession: function(sessionId) {
            console.log("renewing session: " +sessionId);
            setCookie("gamesession", sessionId, 300);
        }
    }
}());