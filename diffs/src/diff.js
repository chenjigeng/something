import * as _ from './utils'

const REPLACE = 0
const ATTRS_CHANGE = 1
const TEXT_CHANGE = 2
const REORDER = 3


// 遍历的时候，为每个节点赋予一个标识符
let nKey = 0

function diff(oldNode, newNode) {
  let patchs = {}
  let index = 0
  walk(oldNode, newNode, patchs, index)
  return patchs
}

function walk(oldNode, newNode, patchs,index) {
  let currentPatch = []
  if (newNode === null || newNode === undefined) {
    // 被删除
  }
  else if (oldNode && newNode) {
    // 文本节点
    if (_.isString(newNode) && _.isString(oldNode)) {  
      if (newNode !== oldNode) {
        currentPatch.push({type: TEXT_CHANGE, content: newNode})
      }
    } 
    // 元素节点
    else if (newNode.tagName === oldNode.tagName) {
      let changeAttrs = diffAttrs(oldNode, newNode, currentPatch)
      if (changeAttrs) {
        currentPatch.push({type: ATTRS_CHANGE, attrs: changeAttrs})
      }
      diffChildren(oldNode, newNode, patchs, index)
    }
    // 被取代
    else {
      currentPatch.push({type: REPLACE, node: newNode})
    }
  }
  if (currentPatch.length) {
    patchs[index] = currentPatch
  }
}

function diffAttrs(oldNode, newNode) {
  let newAttrs = newNode.attrs
  let oldAttrs = oldNode.attrs
  let changeAttrs = {}
  let count = 0

  Object.keys(oldAttrs).forEach(function(key) {
    let value = oldAttrs[key]
    if (value !== newAttrs[key]) {
      count++
      changeAttrs[key] = newAttrs[key]
    }
  })

  Object.keys(newAttrs).forEach(function(key) {
    let value = newAttrs[key]
    if (!oldAttrs.hasOwnProperty(key)) {
      count++
      changeAttrs[key] = newAttrs[key]
    }
  })
  if (count) {
    return changeAttrs
  }
  return {}
}

function diffChildren(oldNode, newNode, patchs, index) {
  oldNode.children.forEach(function(child, index) {
    let currentIndex = ++nKey
    walk(oldNode.children[index], newNode.children[index], patchs, currentIndex)
  })
}

export default diff