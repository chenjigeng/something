import element from './element'
import diff from './diff'
import patch from './patch'

// let element = require('./element')
let node = element('li', {class: 't1'}, [
  element('li', {class: 't2'}, ['asdasd']),
  element('li', {class: 't3'}, ['asdasd']),
  element('li', {class: 't4'}, ['asdasd'])
])

let newNode = element('li', {class: 'p1'}, [
  element('li', {class: 'n2', id: 22}, ['vvv']),
  element('p', {class: 'n3', id: 11}, ['vvv1']),
  element('li', {class: 'n4'}, ['vvv2'])
])
let patchs = diff(node, newNode)
console.log(patchs)
let oldNode = node.render()
console.log(patch(oldNode, patchs))