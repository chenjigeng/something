/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _element = __webpack_require__(1);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// let element = require('./element')
	var node = (0, _element2.default)('li', { class: 't1' }, [(0, _element2.default)('li', { class: 't2' }, ['asdasd']), (0, _element2.default)('li', { class: 't2' }, ['asdasd']), (0, _element2.default)('li', { class: 't3' }, ['asdasd'])]);
	console.log(node);
	console.log(node.render());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Element = function () {
	  function Element(tagName, attrs, children) {
	    _classCallCheck(this, Element);

	    this.tagName = tagName;
	    if (utils.isArray(attrs)) {
	      children = attrs;
	      attrs = {};
	    }
	    this.attrs = attrs;
	    this.children = children;
	  }

	  _createClass(Element, [{
	    key: 'render',
	    value: function render() {
	      var newNode = document.createElement(this.tagName);
	      Object.keys(this.attrs).forEach(function (key) {
	        utils.setAttrs(newNode, key, this.attrs[key]);
	      }, this);
	      this.children.forEach(function (child, index) {
	        if (utils.isString(child)) {
	          var textNode = document.createTextNode(child);
	          newNode.appendChild(textNode);
	        } else {
	          var childNode = child.render();
	          newNode.appendChild(childNode);
	        }
	      });
	      return newNode;
	    }
	  }]);

	  return Element;
	}();

	function ele(tagName, attrs, children) {
	  return new Element(tagName, attrs, children);
	}

	exports.default = ele;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);