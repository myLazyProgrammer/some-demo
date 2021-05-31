import Dep from './Dep'
import { defineReactive } from './utils'

export default class Observer {
  value!: any
  deps!: Dep
  vmCount!: number

  constructor(value: any) {
    this.value = value
    this.deps = new Dep()
    this.vmCount = 0
    this.walk(value)
  }

  walk(value: any) {
    const keys = Object.keys(value);
    for(let i = 0; i < keys.length; i++) {
      defineReactive(value, keys[i]);
    }
  }
}