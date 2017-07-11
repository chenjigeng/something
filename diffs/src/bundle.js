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

	var _diff = __webpack_require__(3);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(4);

	var _patch2 = _interopRequireDefault(_patch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// let element = require('./element')
	var node = (0, _element2.default)('li', { class: 't1' }, [(0, _element2.default)('li', { class: 't2' }, ['asdasd']), (0, _element2.default)('li', { class: 't3' }, ['asdasd']), (0, _element2.default)('li', { class: 't4' }, ['asdasd'])]);

	var newNode = (0, _element2.default)('li', { class: 'p1' }, [(0, _element2.default)('li', { class: 'n2', id: 22 }, ['vvv']), (0, _element2.default)('p', { class: 'n3', id: 11 }, ['vvv1']), (0, _element2.default)('li', { class: 'n4' }, ['vvv2'])]);
	var patchs = (0, _diff2.default)(node, newNode);
	console.log(patchs);
	var oldNode = node.render();
	console.log((0, _patch2.default)(oldNode, patchs));

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
	        console.log(utils.isString(child));
	        if (utils.isString(child)) {
	          var textNode = document.createTextNode(child);
	          newNode.appendChild(textNode);
	        } else {
	          console.log(child);
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
	  var str = Object.prototype.toString.call(obj).replace(/\[object\s+|\]/gi, '');
	  return str;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var _ = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var REPLACE = 0;
	var ATTRS_CHANGE = 1;
	var TEXT_CHANGE = 2;
	var REORDER = 3;

	// 遍历的时候，为每个节点赋予一个标识符
	var nKey = 0;

	function diff(oldNode, newNode) {
	  var patchs = {};
	  var index = 0;
	  walk(oldNode, newNode, patchs, index);
	  return patchs;
	}

	function walk(oldNode, newNode, patchs, index) {
	  var currentPatch = [];
	  if (newNode === null || newNode === undefined) {
	    // 被删除
	  } else if (oldNode && newNode) {
	    // 文本节点
	    if (_.isString(newNode) && _.isString(oldNode)) {
	      if (newNode !== oldNode) {
	        currentPatch.push({ type: TEXT_CHANGE, content: newNode });
	      }
	    }
	    // 元素节点
	    else if (newNode.tagName === oldNode.tagName) {
	        var changeAttrs = diffAttrs(oldNode, newNode, currentPatch);
	        if (changeAttrs) {
	          currentPatch.push({ type: ATTRS_CHANGE, attrs: changeAttrs });
	        }
	        diffChildren(oldNode, newNode, patchs, index);
	      }
	      // 被取代
	      else {
	          currentPatch.push({ type: REPLACE, node: newNode });
	        }
	  }
	  if (currentPatch.length) {
	    patchs[index] = currentPatch;
	  }
	}

	function diffAttrs(oldNode, newNode) {
	  var newAttrs = newNode.attrs;
	  var oldAttrs = oldNode.attrs;
	  var changeAttrs = {};
	  var count = 0;

	  Object.keys(oldAttrs).forEach(function (key) {
	    var value = oldAttrs[key];
	    if (value !== newAttrs[key]) {
	      count++;
	      changeAttrs[key] = newAttrs[key];
	    }
	  });

	  Object.keys(newAttrs).forEach(function (key) {
	    var value = newAttrs[key];
	    if (!oldAttrs.hasOwnProperty(key)) {
	      count++;
	      changeAttrs[key] = newAttrs[key];
	    }
	  });
	  if (count) {
	    return changeAttrs;
	  }
	  return {};
	}

	function diffChildren(oldNode, newNode, patchs, index) {
	  oldNode.children.forEach(function (child, index) {
	    var currentIndex = ++nKey;
	    walk(oldNode.children[index], newNode.children[index], patchs, currentIndex);
	  });
	}

	exports.default = diff;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var _ = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var REPLACE = 0;
	var ATTRS_CHANGE = 1;
	var TEXT_CHANGE = 2;
	var REORDER = 3;

	function patch(node, patchs) {
	  var walker = {
	    index: 0
	  };
	  walk(node, patchs, walker);
	  return node;
	}

	function walk(node, patchs, walker) {
	  var currentPatch = patchs[walker.index++];
	  var len = node.childNodes.length;
	  for (var i = 0; i < len; i++) {
	    walk(node.childNodes[i], patchs, walker);
	  }

	  if (currentPatch) {
	    dealPatchs(node, currentPatch);
	  }
	}

	function dealPatchs(node, currentPatch) {
	  for (var i = 0; i < currentPatch.length; i++) {
	    switch (currentPatch[i].type) {
	      case ATTRS_CHANGE:
	        handleAttrs(node, currentPatch[i].attrs);
	        break;
	      case TEXT_CHANGE:
	        node.textContent = currentPatch[i].content;
	        break;
	      case REPLACE:
	        var newNode = _.isString(currentPatch[i].node) ? document.createTextNode(currentPatch[i].node) : currentPatch[i].node.render();
	        node.parentNode.replaceChild(newNode, node);
	        break;
	      default:
	        // TODO list reorder
	        break;
	    }
	  }
	}

	function handleAttrs(node, attrs) {
	  for (var key in attrs) {
	    if (!attrs[key]) {
	      node.removeAttribute(key);
	    } else {
	      _.setAttrs(node, key, attrs[key]);
	    }
	  }
	}
	exports.default = patch;

/***/ }
/******/ ]);