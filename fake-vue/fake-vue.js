(function(global, factory){
    global.Vue = factory()
})(
  this, function(){
      function Vue(options){
          this._init(options)
      }

      var uid = 0

      Vue.prototype._init = function(options){
        const vm = this
        vm._uid = uid++
        vm.$options = options
        vm._self = vm
        initState(vm)
      }

      function initState(vm){
        vm._watchers = []
        const opts = vm.$options
        if(opts.props) initProps(vm, opts.props)
        if(opts.data)initData(vm)
      }

      function initProps(vm){
        var propsData = vm.$options.propsData || {}
        var props = vm._props = {}
        var keys = vm.$options._propKeys = []
        //是否为根结点
        var isRoot = !vm.$parent
        var loop = function(key){
            keys.push(key)
            if (!(key in vm)) {
                proxy(vm, "_props", key)
            }
        }
      }

      function proxy(target, sourceKey, key){
        
      }

      function initData(vm){
        var data = vm.$options.data
        data = vm._data = getData(data, vm)
        var keys = Object.keys(data)
      }

      function getData(data, vm){
          return data.call(vm)
      }


      //注册到dom的事件
      Vue.prototype.$mount = function(el){
          const template = document.querySelector(el)
          const outerHTML = template.outerHTML
      }

      return Vue
    }
)
