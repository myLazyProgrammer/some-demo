import Vue from './Vue';

declare global {
  interface Window {
    Vue: Vue,
  }
}
