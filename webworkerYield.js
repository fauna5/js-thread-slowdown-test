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

    //webworker code
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
 
//   /**
//    * Add an event listener to the Metronome.
//    *
//    * On every tick of the metrome, listeners bound to the "tick"
//    * event will be called with a single argument which is the number
//    * of times the metronome has ticked so far.
//    *
//    * Additionally, on the nth tick of the metronome, listeners bound
//    * to the event `n` (number) will be called.
//    *
//    * @param {string|number} e
//    * @param {function} listener
//    */
//   Metronome.prototype.on = function (e, listener) {
//     this._events = this._events || {};
//     this._events[e] = this._events[e] || [];
//     this._events[e].push(listener);
//   };
 
//   /**
//    * Remove an event listener.
//    *
//    * @param {string|number} e
//    * @param {function} listener
//    */
//   Metronome.prototype.removeListener = function (e, listener) {
//     this._events = this._events || {};
//     if (e in this._events) {
//       this._events[e].splice(this._events[e].indexOf(listener), 1);
//     }
//   };
 
//   *
//    * Call each listener bound to a given event with the supplied arguments.
//    *
//    * @param {string|number} e
//    * @param {object} args Array of arguments to apply to the listeners.
//    * @api private
   
//   Metronome.prototype.trigger = function (e, args) {
//     this._events = this._events || {};
//     if (e in this._events === false) { return; }
//     for (var i = this._events[e].length; i--;) {
//       this._events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
//     }
//   };
 
//   /**
//    * Start the metronome.
//    */
//   Metronome.prototype.start = function () {
//     this.worker.postMessage({
//       action: "start",
//       bpm: this.bpm,
//       res: this.res,
//     });
//   };
 
//   /**
//    * Stop the metronome.
//    */
//   Metronome.prototype.stop = function () {
//     this.worker.postMessage({
//       action: "stop"
//     });
//   };
 
//   /**
//    * Reset the tick count.
//    */
//   Metronome.prototype.reset = function () {
//     this.ticks = 0;
//   };
 
//   window.Metronome = Metronome;
 
// })(this);