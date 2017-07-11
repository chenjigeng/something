'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAttrs = setAttrs;
exports.isArray = isArray;
exports.isString = isString;
exports.getType = getType;

/**
 * 设置节点的属性
 * 
 * @export
 * @param {any} node 
 * @param {any} key 
 * @param {any} value 
 */
function setAttrs(node, key, value) {
  if (key === 'style') {
    node.style.cssText = value;
  } else if (key === 'value') {
    var tagName = node.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
      node.value = value;
    } else {
      node.setAttribute(key, value);
    }
  } else {
    node.setAttribute(key, value);
  }
}

/**
 * 判断对象是否是数组
 * 
 * @export
 * @param {any} obj 
 * @returns 
 */
function isArray(obj) {
  return getType(obj) === 'Array' ? true : false;
}

/**
 * 判断对象是否是字符串
 * 
 * @export
 * @param {any} obj 
 * @returns 
 */
function isString(obj) {
  return getType(obj) === 'String' ? true : false;
}

/**
 * 获取对象的类型
 * 
 * @export
 * @param {any} obj 
 * @returns 
 */
function getType(obj) {
  var str = Object.prototype.toString.call(obj).replace(/\[object\S+|\]/, '');
  return str;
}