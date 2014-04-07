(function (window, undefined) {

    var count = 0;
    var yieldMethod;
    var startTime;

    function go(){
        var generationMethod = document.getElementById("gen").value;
        var yieldSelection = document.getElementById("yield").value;
        document.title = "test[" + generationMethod + "," + yieldSelection + "]";        
        
        var testStatus = document.createElement("p");
        testStatus.innerHTML = "Started...";
        document.body.appendChild(testStatus);

        var yieldMethod = yieldMethods[yieldSelection];

        if (generationMethod == "Websocket"){
            setupWebsocket(yieldMethod);
        } else {
            startTime = Date.now();
            setInterval(yieldMethod, 3); // Msg every 3ms
        }
    }

    function timeout(){
        setTimeout(msgReceived, 0);
    }

    function postMessageCaller(){
        window.postMessageYield(msgReceived);
    }

    function webWorkerCaller(){
        window.webworkerYield(msgReceived);
    }

    function _requestAnimationFrame(){
        window.requestAnimationFrame(msgReceived);
    }

    var yieldMethods = {
        "postMessage": postMessageCaller,
        "setTimeout": timeout,
        "requestAnimationFrame": _requestAnimationFrame,
        "webWorker": webWorkerCaller
    };

    function msgReceived(){
        count++;
        if (count % 1000 == 0){
            var time = (Date.now() - startTime) / 1000;
            console.log("1000 msgs in " + time + " secs");
            count = 0;
            startTime = Date.now();
        }
    }

    function setupWebsocket(yieldMethod){
        var url = "ws://localhost:8001";
        var ws = new WebSocket(url);
        var opened = false;
        
        ws.onopen = function(){
            startTime = Date.now();
            opened = true;
            console.log("Connected...");
        };
        ws.onmessage = function (evt){
            yieldMethod.call();
        };
        ws.onclose = function(){
            if(opened){
                console.log("Connection is closed...");
            } else {
                console.log("Couldn't make a connection to " + url + " :(");
            }
        };
    }   

    window.go = go;
})(this)

