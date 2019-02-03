Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fnName = Symbol('fn');
  context[fnName] = this;
  const result = context[fnName](...args);
  delete context[fnName];

  return result;
}

// apply
Function.prototype.myApply = function (context, args) {
  context = context || window;
  const fnName = Symbol('fn');
  context[fnName] = this;
  const result = context[fnName](...args);
  delete context[fnName];

  return result;
}

function sayName(a, b) {
  console.log(a, b, this.name);

  return `${a} ${b} ${this.name}`;
}

const obj = {
  name: 'cjg'
};
console.log(sayName.myCall());