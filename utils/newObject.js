/**
 *
 *
 * @param {Function} constru
 * @param {*} params
 */
function newObject(constru, ...params) {
  const obj = Object.create(constru.prototype);
  const ret = constru.apply(obj, params);
  return ret instanceof Object && ret ? ret : obj;
}

// test code
function Otaku (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = newObject(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin