import { sharedPropertyDefinition } from './constats';
import { IDataOption } from './typing';
import Vue from './Vue';
import Observer from './Observer';

export const getData = (data: IDataOption, vm: Vue) => {
  return data.call(vm)
}

export const proxy = (vm: Vue, sourceKey: string, key: string) => {
  Object.defineProperty(vm, key, {
    ...sharedPropertyDefinition,
    get() {
      return this[sourceKey][key]
    },
    set(newVal: any) {
      this[sourceKey][key] = newVal
    }
  })
}

export const observe = (data: any, asRootData: boolean) => {
  const ob = new Observer(data);
  if (asRootData) {

  }
}

export const defineReactive = (obj: any, key: string) => {

}