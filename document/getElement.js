// 递归版本的，不过其实浏览器的getElementById的实现方法是利用哈希
function getElementById(node, id) {
  if (!node) {
    return null
  }
  if (node.id === id) {
    return node
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    var result = getElementById(node.childNodes[i], id)
    if (result) {
      return result
    }
  }
  return null;
}

function getElementsByClassName(node, classname) {
  var results = []
  if (!node) {
    return results
  }
  results = results.concat(findElements(node, classname))
  return results
}

function findElements(node, classname) {
  var results = []
  // 之所以要判断是不是string类型
  // 因为当时获取className的时候，获取到一个svg对象
  if (node.className && typeof node.className === 'string' && node.className.trim().split(/ +/).indexOf(classname) >= 0) {
    results.push(node)
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    results = results.concat(findElements(node.childNodes[i], classname))
  }
  return results
}


// 非递归
function getElementById(node, id) {
  
}


// querySelector他的原理是，将selector表达式划分为一个个selector,然后从最后一个selector开始匹配，并从右往左查找匹配