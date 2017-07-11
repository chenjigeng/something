'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

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