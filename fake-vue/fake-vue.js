(function(global, factory){
    global.Vue = factory
})(
  this, function(){
      function Vue(options){
          this.init(options)
      }


      //注册到dom的事件
      this.$mount = function(el){
          const template = document.querySelector(el)
          const outerHTML = template.outerHTML
      }
    }
)
