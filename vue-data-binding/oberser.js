

var uid = 0

function observer(data) {
  if (!data || !(data instanceof Object)) {
    return
  }
  return new Observer(data)
}

function Observer(data) {
  this.data = data
  this.walk()
}

Observer.prototype = {
  walk: function() {
    var me = this;
    Object.keys(this.data).forEach(function(key) {
      me.defineReactive(me.data, key, me.data[key])
    })
  },
  //为属性定义getter和setter拦截器，当数据发送变化的时候，执行监听该数据变化的监听器的函数
  defineReactive: function(data, key, value) {
    var dep = new Dep()
    //为对象的子对象注册拦截器
    var childObj = observer(value)
    Object.defineProperty(data, key, {
     enumerable: true,
     get: function() {
       if (Dep.target) {
         dep.depend()
       }
       return value
     },
     set: function(newValue) {
       if (newValue === value) {
         return
       }
       value = newValue
       var childObj = observer(value)
       dep.notify()
     }
   })
  }
}

//发布者，当数据发送变化的时候，触发所有订阅者执行更新操作
function Dep() {
  this.subs = []
  this.id = uid++
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update()
    });
  },
  //订阅者将该数据加入其依赖关系中，当该数据发生变化的时候，执行订阅者的更新函数
  depend: function() {
    Dep.target.addDep(this)
  }
}

//订阅者,监听函数
function Watcher(vm, exporfun, cb) {
  this.vm = vm
  this.deps = {}
  this.getters = this.parse(exporfun)
  this.get()
  this.cb = cb
}

Watcher.prototype = {
  update: function() {
    var oldValue = this.value
    this.get()
    if (oldValue === this.value) {
      return
    }
    this.cb && this.cb(oldValue, this.value)
  },
  get: function() {
    Dep.target = this
    var newValue = this.getters.call(this.vm, this.vm)
    this.value = newValue
    Dep.target = null
  },
  parse: function(exporfun) {
    if (exporfun instanceof Function) {
      return exporfun
    }
    return function(vm) {
      var exps = exporfun.split('.')
      var val = vm
      for (var i = 0; i < exps.length; i++) {
        val = val[exps[i]]
      }
      return val
    }
  },
  addDep: function(dep) {
    // 判断该依赖关系是否已经存在，若不存在，则将其加入依赖关系中 
    if (!this.deps.hasOwnProperty(dep.id)) {
      this.deps[dep.id] = dep
      dep.addSub(this)
    }
  }
}

var data = {
  name: 'cjg',
  age: 21,
  child: {
    name: 'zht'
  }
}

observer(data)
new Watcher(data, 'name', function(oldValue, newValue) {
  console.log(oldValue, newValue)
})
data.name = 'xcvxcv'
data.name = 'xcvxcv12312'
new Watcher(data, 'child.name', function(oldValue, newValue) {
  console.log(oldValue, newValue)
})
data.child.name = 'dmh'
data.child.name = 'cwc'


// VM
function MVVM(options) {
  this.options = options || {}
  this.$data = options.data
  observer(this.$data)
  this.initData()
  this.init()
}

MVVM.prototype = {
  // 将this.$data里面的数据移到this上，即可以通过this.a来访问this.$data.a的数据
  initData: function() {
    var me = this
    Object.keys(this.$data).forEach(function(key) {
      Object.defineProperty(me, key, {
        enumerable: true,
        get: function() {
          return me.$data[key]
        },
        set: function(newValue) {
          if (me.$data[key] === newValue) return
          me.$data[key] = newValue
        }
      })
    })
  },
  //初始化并且编译节点
  init: function() {
    this.$el = this.isElementNode(this.options.el) ? this.options.el : document.querySelector(this.options.el)
    var fragment = this.node2Fragment()
    this.compile(fragment)
    this.$el.appendChild(fragment)
  },
  // 将节点转为fragment,通过fragment来操作DOM，可以获得更高的效率
  // 因为如果直接操作DOM节点的话，每次修改DOM都会导致DOM的回流或重绘，而将其放在fragment里，修改fragment不会导致DOM回流和重绘
  // 当在fragment一次性修改完后，在直接放回到DOM节点中
  node2Fragment() {
    var fragment = document.createDocumentFragment()
    var firstChild
    while(firstChild = this.$el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  },
  compile: function(node) {
    var me = this
    if (this.isElementNode(node)) {
      var attrs = node.attributes
      Array.prototype.forEach.call(attrs, function(attr) {
        if (me.isDirective(attr.name)) {
          var directive = attr.name.substring(2)
          if (directive.startsWith('bind')) {
            compileUtils['attr'](node, me, attr.value, directive.substring(5))
          } else {
            compileUtils[directive](node, me, attr.value)
          }
          node.removeAttributeNode(attr)
        }
      })
    } else if (this.isTextNode(node)) {
      var reg = /\{\{(.+)\}\}/
      var textContent = node.textContent
      if (reg.test(textContent)) {
        var match = RegExp.$1
        compileUtils['text'](node, me, match)
      }
    }
    //如果有子节点的话，编译子节点
    if (node.childNodes && node.childNodes.length > 0) {
      Array.prototype.forEach.call(node.childNodes, function(childNode) {
        me.compile(childNode)
      })
    }
  },
  isElementNode: function(node) {
    return node.nodeType === 1
  },
  isTextNode: function(node) {
    return node.nodeType === 3
  },
  isDirective: function(attr) {
    return attr.indexOf('v-') === 0;
  }
}

var compileUtils = {
  attr: function(node, vm, exp, attrName) {
    var me = this
    updateFn = function(oldValue, newValue) {
      node.setAttribute(attrName, newValue)
    }
    var value = this.getModelValue(vm, exp)
    node.setAttribute(attrName, value)
    this.bind(vm, exp, updateFn)
  },
  model: function(node, vm, exp) {
    var me = this
    updateFn = function(oldValue, newValue) {
      if (oldValue === newValue) return
      node.value = newValue
    }
    var value = this.getModelValue(vm, exp)
    node.value = value
    this.bind(vm, exp, updateFn)
    node.addEventListener('input', function(event) {
      me.setModelValue(vm, exp, event.target.value)
    })
  },
  text: function(node, vm, exp) {
    var initContent = node.textContent
    var exp = exp.trim()
    var reg = new RegExp('{{\\\s*' + exp + '\\\s*}}', 'ig')
    updateFn = function(oldValue, newValue) {
      node.textContent = initContent.replace(reg, newValue)
    }
    var value = this.getModelValue(vm, exp)
    node.textContent = initContent.replace(reg, value)
    this.bind(vm, exp, updateFn)
  },
  bind: function(vm, exp, updateFn) {
    var watch = new Watcher(vm, exp, updateFn)
  }, 
  getModelValue: function(vm, exp) {
    var value = vm
    var exps = exp.split('.')
    for (var i = 0; i < exps.length; i++) {
      value = value[exps[i]]
    }
    return value
  },
  setModelValue: function(vm, exp, newValue) {
    var value = vm
    var exps = exp.split('.')
    for (var i = 0; i < exps.length - 1; i++) {
      value = value[exps[i]]
    }
    value[exps[exps.length - 1]] = newValue
  }
}