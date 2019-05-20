import Vue from "vue";

import { Events } from "../../constants";

class Wheel {
  constructor(options) {
    this._name = "Wheel";

    this._bus = new Vue().$bus;

    this.addListeners();
  }

  addListeners() {
    if (window.addEventListener) {
      // IE9, Chrome, Safari, Opera
      window.addEventListener("mousewheel", this.onWheel.bind(this), false);
      // Firefox
      window.addEventListener("DOMMouseScroll", this.onWheel.bind(this), false);
    }
    // IE 6/7/8
    else window.attachEvent("onmousewheel", this.onWheel.bind(this));
  }

  removeListeners() {
    return;
  }

  onWheel(event) {
    let e = window.event || event, // old IE support
      delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

    this._bus.emit(Events.WHEEL, delta);
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
    let wheel = new Wheel();

    Object.defineProperty(Vue.prototype, "$wheel", {
      get() {
        return wheel;
      }
    });
  }
};
