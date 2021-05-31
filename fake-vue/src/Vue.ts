import { IOptions } from './typing';
import { getData, proxy, observe } from './utils';

export default class Vue {
  uid = 0
  _uid = 0
  $options!: IOptions
  _watchers = []
  _data!: Object

  constructor(options: any) {
    this._init(options);
  }

  _init(options: any) {
    const vm = this
    vm._uid = this.uid ++
    vm.$options = options
    this.initState(vm)
  }

  initState(vm: Vue) {
    const opts = vm.$options
    this.initData(vm);
  }

  initData(vm: Vue) {
    const data = getData(vm.$options.data, vm)
    let keys = Object.keys(data);
    let i = keys.length;
    while(i--) {
      proxy(vm, '_data', keys[i])
    }
    observe(data, true)
  }
}