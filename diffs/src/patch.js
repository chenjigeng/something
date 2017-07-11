import * as _ from './utils'

const REPLACE = 0
const ATTRS_CHANGE = 1
const TEXT_CHANGE = 2
const REORDER = 3

function patch(node, patchs) {
  let walker = {
    index: 0
  }
  walk(node, patchs, walker)
  return node
}

function walk(node, patchs, walker) {
  let currentPatch = patchs[walker.index++]
  let len = node.childNodes.length
  for (let i = 0; i < len; i++) {
    walk(node.childNodes[i], patchs, walker)
  }
  
  if (currentPatch) {
    dealPatchs(node, currentPatch)
  }
}

function dealPatchs(node, currentPatch) {
  for (let i = 0; i < currentPatch.length; i++) {
    switch (currentPatch[i].type) {
      case ATTRS_CHANGE:
        handleAttrs(node, currentPatch[i].attrs)
        break;
      case TEXT_CHANGE:
        node.textContent = currentPatch[i].content
        break
      case REPLACE:
        let newNode = _.isString(currentPatch[i].node) 
          ? document.createTextNode(currentPatch[i].node)
          : currentPatch[i].node.render()
        node.parentNode.replaceChild(newNode, node)
        break;
      default:
        // TODO list reorder
        break;  
    }
  }
}

function handleAttrs(node, attrs) {
  for (let key in attrs) {
    if (!attrs[key]) {
      node.removeAttribute(key)
    } else {
      _.setAttrs(node, key, attrs[key])
    }
  }
}
export default patch