var requestAnimFrame = function () {
  if (typeof window !== "undefined") {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function cb(
    /* function */
    callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }

  return function () {
    /* return empty function */
  };
}();

/*
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
export var requestTimeout = function requestTimeout(fn, delay) {
  if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
  !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) {
    return window.setTimeout(fn, delay);
  }

  var start = new Date().getTime();
  var handle = {
    value: 0
  };

  function loop() {
    var current = new Date().getTime();
    var delta = current - start;

    if (delta >= delay) {
      fn.call(null);
    } else {
      handle.value = requestAnimFrame(loop);
    }
  }

  handle.value = requestAnimFrame(loop);
  return handle;
};
/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */

export var clearRequestTimeout = function clearRequestTimeout(handle) {
  return window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)
  /* Support for legacy API */
  : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) : clearTimeout(handle);
};