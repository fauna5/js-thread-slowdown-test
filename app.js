(function (window, undefined) {

        var count = 0;
        var yieldMethod;

        function go(){
            var gen = document.getElementById("gen").value;
            var yieldSelection = document.getElementById("yield").value;
            window.document.title = "test[" + gen + "," + yieldSelection + "]";
            var elem = document.createElement("p");
            elem.innerHTML = "Started... \n results in console";
            document.body.appendChild(elem);


            yieldMethod = methods[yieldSelection];

            if(gen == "Websocket"){
                var url = "ws://localhost:8001";
                var ws = new WebSocket(url);
                var opened = false;
                ws.onopen = function()
                {
                    startTime = Date.now();
                    opened = true;
                    console.log("Connected...");
                };
                ws.onmessage = function (evt)
                {
                    doYield();
                };
                ws.onclose = function()
                {
                    if(opened){
                        console.log("Connection is closed...");
                    } else {
                        console.log("Couldn't make a connection to " + url + " :(");
                    }

                };
            } else {
                startTime = Date.now();
                setInterval(doYield, 3); // Msg every 3ms
            }
        }

        function doYield(){
            yieldMethod.call();
        }

        function timeout(){
            setTimeout(msgReceived, 0);
        }

        function setTimeoutTwice(){
            setTimeout(timeout, 0);
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

        var methods = {
            "postMessage": postMessageCaller,
            "setTimeout": timeout,
            "setTimeoutTwice": setTimeoutTwice,
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

        window.go = go;
})(this)

