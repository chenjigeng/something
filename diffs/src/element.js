import * as utils from './utils'

class Element {
  constructor (tagName, attrs, children) {
    this.tagName = tagName
    if (utils.isArray(attrs)) {
      children = attrs
      attrs = {}
    }
    this.attrs = attrs
    this.children = children
  }
  render () {
    let newNode = document.createElement(this.tagName)
    Object.keys(this.attrs).forEach(function(key) {
      utils.setAttrs(newNode, key, this.attrs[key])
    }, this);
    this.children.forEach(function(child, index) {
      console.log(utils.isString(child))
      if (utils.isString(child)) {
        let textNode = document.createTextNode(child)
        newNode.appendChild(textNode)
      } else {
        console.log(child)
        let childNode = child.render()
        newNode.appendChild(childNode)
      }
    })
    return newNode
  }
}

function ele(tagName, attrs, children) {
  return new Element(tagName, attrs, children)
}

export default ele