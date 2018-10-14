function myBind(that) {
  let target = this;
  const args = Array.prototype.slice.call(arguments, 1);

  let bound;

  function binder() {
    if (this instanceof bound) {
      const result = target.apply(this, Array.prototype.concat.apply(args, arguments));
      if (result) {
        return result;
      }
      return this;
    } else {
      target.apply(that, Array.prototype.concat.apply(args, arguments));
      return that;
    }
  }

  // 需要额外传的参数的长度
  const boundLength = target.length - args.length;
  const boundArgs = [];

  for (let i = 0; i < boundLength; i++) {
    boundArgs.push(`$${i}`);
  }

  // 使用Function创建一个binder函数，通过预制额外的参数，可以解决fn.length丢失问题
  bound = Function('binder', `return function(${boundArgs.join(',')}) { binder.apply(this, arguments)}`)(binder);

  function Empty() {}
  // 让实例可以使用target的原型链上的方法
  if (target.prototype) {
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
  }

  return bound;
}

// Function.prototype.myBind = myBind;

// function t(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const obj = {};

// h = t.myBind(obj, 'cjg');

// hh = t(24);
// p = new h(24);
