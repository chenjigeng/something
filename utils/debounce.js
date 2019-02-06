/**
 *
 *
 * @param {Function} fun
 * @param {Number} time
 * @param {Boolean} immediate
 * @returns
 */
function debounce(fun, time, immediate) {
  let tid, result;

  return function(...args) {
    const context = this;

    if (tid) {
      clearTimeout(tid);
    }

    if (immediate) {
      if (!tid) result = fun.apply(context, args);
    }

    tid = setTimeout(() => {
      fun.apply(context, args);
    }, time);

    return result;
  }
}