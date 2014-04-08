var ws = require("nodejs-websocket")

console.log("Starting ws server on port 8001");
console.log("Now load up test.html from the filesystem");

var server = ws.createServer(function (conn) {
    console.log("New connection");
    var interval = setInterval(function(){
        conn.sendText("message", function(){});
    }, 3)
    conn.on("close", function (code, reason) {
        clearInterval(interval);
        console.log("Closed");
    })
    conn.on("error", function (err){
        console.log(err);
    })
}).listen(8001)