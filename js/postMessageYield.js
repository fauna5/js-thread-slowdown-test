(function (window, undefined) {    
    var timeouts = [];
    var messageName = "zero-timeout-message";

    function postMessageYield(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    window.addEventListener("message", handleMessage, true);
    
    window.postMessageYield = postMessageYield;
})(this);