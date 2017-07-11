'use strict';

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let element = require('./element')
var node = (0, _element2.default)('li', { class: 't1' }, [(0, _element2.default)('li', { class: 't2' }, ['asdasd']), (0, _element2.default)('li', { class: 't2' }, ['asdasd']), (0, _element2.default)('li', { class: 't3' }, ['asdasd'])]);
console.log(node);
console.log(node.render());