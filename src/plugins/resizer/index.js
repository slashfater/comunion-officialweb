import Vue from "vue";

import { Events } from "../../constants";

class Resizer {
  constructor(options) {
    this._name = "Resizer";

    this._bus = new Vue().$bus;

    this.addListeners();
  }

  addListeners() {
    window.addEventListener(Events.RESIZE, this.onResize.bind(this), false);
  }

  removeListeners() {
    window.removeEventListener(Events.RESIZE, this.onResize.bind(this));
  }

  onResize() {
    this._bus.emit(Events.RESIZE);
  }

  get name() {
    return this._name;
  }

  get bus() {
    return this._bus;
  }
}

export default {
  install(Vue) {
    let resizer = new Resizer();

    Object.defineProperty(Vue.prototype, "$resizer", {
      get() {
        return resizer;
      }
    });
  }
};
