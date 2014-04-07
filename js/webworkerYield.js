(function (window, undefined) {
 

  var timeouts = [];

  function webworkerYield(fn) {
    timeouts.push(fn);
    worker.postMessage();
  }

  function webworkerCallback() {
    if (timeouts.length > 0) {
      var fn = timeouts.shift();
      fn();
    }
  }

  // webworker code and plumbing
  var msgHandler = function (e) {
      self.postMessage();
  }
  var inline = "self.addEventListener('message', " + msgHandler.toString() + ");";

  var url = window.URL || window.webkitURL
    , blob = new Blob([inline])
    , blobUrl = url.createObjectURL(blob);
 
  var worker = new Worker(blobUrl);
  worker.addEventListener("message", function (e) {
      webworkerCallback();
  });

  window.webworkerYield = webworkerYield;
})(this);