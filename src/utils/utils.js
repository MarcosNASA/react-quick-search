function debounceFn(fn, delay) {
  var timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(null, args);
    }, delay);
  };
}
const identity = (value) => value;

export { debounceFn, identity };
