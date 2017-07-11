import element from './element'

let node = element('li', {class: 't1'}, [
  element('li', {class: 't2'}, ['asdasd']),
  element('li', {class: 't2'}, ['asdasd']),
  element('li', {class: 't3'}, ['asdasd'])
])
console.log(node)