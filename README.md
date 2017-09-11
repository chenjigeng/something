## 杂七杂八的东西
目前在模拟vuejs的双向数据绑定写一些demo,目前实现以下功能
1. 支持使用v-model指令
2. 允许使用{{}}语法，并且可以放在其他标签内部，比如
```html
<input v-model='text' />
<span>{{text}}</span>
```

## 增加了图片轮播代码
分为两种，一种是通过修改透明度的方式来实现，还有一种是通过控制transformX的值来决定

## 增加了图片懒加载插件
只需要通过以下方式:
```html
<img src='./blank.jpg' data-src='./3.jpg' class='lazy'/>
```
当用户拖动页面(scroll)/改变页面大小(resize)的时候，则会触发监听事件，利用requestIdleCallback在浏览器空闲的时间内，去检测是否有需要加载的图片
优化点：
1. 使用throttle来保证滚动/resize事件在一段时间内只会触发一次
2. 使用requestIdelCallback在浏览器空闲的时间内，再去触发更新，从而不会阻塞主线程。