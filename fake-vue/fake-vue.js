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

      let uid$$2 =  0

      var Watcher = function Watcher(
        vm,
        expOrFn,
        cb,
        options,
        isRenderWatcher
      ){
        this.vm = vm
        vm._watchers.push(this)
        if(options){
          this.deep = !!options.deep
          this.user = !!options.user
          this.lazy = !!options.lazy
          this.sync = !!options.sync
          this.before = options.before
        }else {
          this.deep = this.user = this.lazy = this.sync = false
        }
        this.cb = cb
        //batchId
        this.id = ++uid$$2
        this.active = true
        this.dirty = this.lazy
        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.expression = expOrFn.toString()
        this.getter = expOrFn
        this.value = this.lazy ? undefined : this.get()
      }
      /**
       * lazy watchers 是什么？
       * Evaluate the value of the watcher.
       * This only gets called for lazy watchers.
       */
      Watcher.prototype.evaluate = function evaluate () {
        this.value = this.get();
        this.dirty = false;
      }
      Watcher.prototype.get = function get(){
        let value
        let vm = this.vm
        value = this.getter.call(vm)
        return value
      }

      function noop (a, b, c) {}

      function initState(vm){
        vm._watchers = []
        const opts = vm.$options
        if(opts.props) initProps(vm, opts.props)
        if(opts.data)initData(vm)
        if(opts.computed) initComputed(vm, opts.computed)
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
        for(let i in keys){ loop(key) }
      }
      

      const sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: noop,
        set: noop
      }
      function proxy(target, sourceKey, key){
        sharedPropertyDefinition.get = function proxyGetter(){
          return this[sourceKey][key]
        }
        sharedPropertyDefinition.set = function proxySetter(val){
          this[sourceKey][key] = val
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
      }

      function initData(vm){
        let data = vm.$options.data
        data = vm._data = getData(data, vm)
        const keys = Object.keys(data)
        let i = keys.length

        while(i--){
          proxy(vm, '_data', keys[i])
        }
      }

      function getData(data, vm){
          return data.call(vm)
      }

      var computedWatcherOptions = { lazy: true };
      function initComputed(vm, computed){
        let watchers = vm._computedWatchers = Object.create(null)
        for(let key in computed){
          let getter = computed[key]
          watchers[key] = new Watcher(
            vm,
            getter || noop,
            noop,
            computedWatcherOptions
          )
          if(!(key in vm)){
            defineComputed(vm, key, getter)
          }
        }
      }

      function createComputedGetter (key) {
        return function computedGetter () {
            var watcher = this._computedWatchers && this._computedWatchers[key]
            if (watcher) {
                if (watcher.dirty) {
                  //lazy watcher
                    watcher.evaluate()
                }
                // if (Dep.target) {
                //     watcher.depend()
                // }
                return watcher.value
            }
        }
    }

      function defineComputed(target, key, getter){
        sharedPropertyDefinition.get = createComputedGetter(key)
        sharedPropertyDefinition.set = noop
        Object.defineProperty(target, key, sharedPropertyDefinition)
      }


      //注册到dom的事件
      Vue.prototype.$mount = function(el){
          const template = document.querySelector(el)
          const outerHTML = template.outerHTML
          return this
      }

      return Vue
    }
)
