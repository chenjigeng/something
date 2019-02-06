Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('传入参数不是函数');
  }

  const fn = this;
  
  const bound = function(...otherArgs) {
    return this instanceof bound ? fn.apply(this, [...args, ...otherArgs]): fn.apply(context, [...args, ...otherArgs]);
  }

  function emptyFn() {}
  emptyFn.prototype = this.prototype;

  bound.prototype = new emptyFn();

  return bound;
}

function t(name, age) {
  this.name = name;
  this.age = age;
  return this;
}

const obj = {};
console.log(obj)

h = t.myBind(obj, 'cjg');

hh = h(24);
p = new h(24);

console.log(hh);
console.log(p)
console.log(obj)