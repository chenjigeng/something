
var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

var setUseAction = throttle(getUserAction, 2000);

container.onmousemove = setUseAction

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})


/**
 *
 *
 * @param {Function} fun
 * @param {Number} waitTime
 * @param {Object} options
 */
function throttle(fun, waitTime, options = {
  leading: true,
  trailing: true,
}) {
  const { leading, trailing } = options;
  let context, delayArgs, tid, previous = 0;

  function later() {
    tid = null;
    previous = Date.now();
    fun.apply(context, delayArgs);
    console.log('apply')

    if (!tid) {
      context = null;
      delayArgs = null;
    }
  }

  function throttled(...args) {
    context = this;
    delayArgs = args;
    const now = Date.now();
    if (!previous && !leading) previous = now;
    const remainTime = waitTime - (now - previous);
    if (remainTime <= 0 || remainTime > waitTime) {
      if (tid) {
        clearTimeout(tid);
        tid = null;
      }

      previous = now;
      fun.apply(context, delayArgs);

      if (!tid) {
        context = null;
        delayArgs = null;
      }
    } else if (!tid && !!trailing) {
      tid = setTimeout(later, remainTime);
    }
  }

  throttled.cancel = function () {
    clearTimeout(tid);
    tid = null;
    previous = 0;
  }

  return throttled;
}