var _lazyLoader = function(config) {
  this.unloadImgs = [];
  this.listening = false;
  this.config = config;
  this.loadCount = 0;
  this.loadingNums = 0;
  this.threshold = config.threshold || 20;
  this.init();
}
_lazyLoader.prototype = {
  init: function() {
    let self = this;
    // 对图片进行初始化
    $("img.lazy").each(function() {
      if (self.isShow(this)) {
        self.show(this)
      } else {
        self.unloadImgs.push($(this)[0]);
      }      
    })
    // 注册滚动监听事件
    var ehandle = this.throttle(function() {
      self.handle();
    }, 500)
    $(window).scroll(ehandle);
    $(window).resize(ehandle);
  },
  handle: function() {
    if (!this.listening && this.unloadImgs.length) {
      this.listening = true;
      var self = this;
      // 若浏览器支持requestIdleCallback，则使用它，否则使用settimeout
      if (window.requestIdleCallback) {
        window.requestIdleCallback(function() {
          self.run()
        }, {timeout: 200});
      } else {
        setTimeout(function() {
          self.run();
        }, 200);
      }
    }  
  },
  run: function() {
    this.toggleListener();
    this.listening = false;
  },
  toggleListener: function() {
    let self = this;
    this.unloadImgs.map(function(unloadImg, index) {
      if (self.isShow(unloadImg)) {
        self.show(unloadImg);
        self.loadCount++;
        self.unloadImgs.splice(index, 1);
      }
    })
  },
  isShow: function($ele) {
    let scrollTop = window.pageYOffset;
    let windowHeight = window.innerHeight;
    let top = $($ele).offset().top;
    return top < scrollTop + windowHeight + this.threshold ? true : false;
  },
  show: function($ele) {
    this.loadingNums++;
    $ele.onload = () => {
      console.log('hhh')
      this.loadingNums--;
      console.log(this.loadingNums)
    }
    let relSrc = $($ele).attr('data-src');
    $($ele).attr('src', relSrc);
  },
  debounce: function(fun, delay) {
    var tid;
    return function() {
      if (tid) {
        clearTimeout(tid);
      }
      tid = setTimeout(fun, delay);
    }
  },
  throttle: function(fun, delay) {
    var tid;
    return function() {
      if (tid) {
        return;
      } else {
        tid = setTimeout(function() {
          fun();
          tid = null;
        }, delay);
      }
    }
  }
}

lazyLoader = {
  init: function(config) {
    this._lazyLoader = new _lazyLoader(config);
  }
}

