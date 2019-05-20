import Vue from "vue";

import { Events } from "../../constants";

class Swiper {
  constructor(options) {
    this._name = "Swiper";

    this._bus = new Vue().$bus;

    this._mouse = { x: 0, y: 0 };

    this._target = undefined;

    this._isDrag = false;

    this._point = {};

    this._dist = {};

    this._time = 0;

    this.addListeners();
  }

  addListeners() {
    let mobile = isMobile.any;

    window.addEventListener(
      mobile ? Events.TOUCH_START : Events.MOUSE_DOWN,
      this.start.bind(this),
      passiveSupport() ? { passive: false } : false
    );

    window.addEventListener(
      mobile ? Events.TOUCH_MOVE : Events.MOUSE_MOVE,
      this.move.bind(this),
      passiveSupport() ? { passive: false } : false
    );

    window.addEventListener(
      mobile ? Events.TOUCH_END : Events.MOUSE_UP,
      this.end.bind(this),
      passiveSupport() ? { passive: false } : false
    );
  }

  start(event) {
    this._isDrag = true;

    this._time = Date.now();

    if (this.prevent(event)) event.preventDefault();

    (this._point.x = event.touches ? event.touches[0].clientX : event.clientX),
      (this._point.y = event.touches
        ? event.touches[0].clientY
        : event.clientY);

    this._dist.x = 0;

    this._dist.y = 0;
  }

  move(event) {
    let x = event.touches ? event.touches[0].clientX : event.clientX,
      y = event.touches ? event.touches[0].clientY : event.clientY;

    this._mouse.x = x - window.innerWidth / 2;

    this._mouse.y = y - window.innerHeight / 2;

    if (!this._isDrag) return;

    this._dist.x = x - this._point.x;

    this._dist.y = y - this._point.y;

    if (Math.abs(this._dist.x) > 5 || Math.abs(this._dist.y) > 5)
      this._bus.emit(Events.DRAG, {
        dist: this._dist
      });
  }

  end(event) {
    if (Math.abs(this._dist.x) > 5 || Math.abs(this._dist.y) > 5)
      this._bus.emit(Events.DROP, {
        leave: this.leave(),

        dir: this._dist.y < 0 ? 1 : -1,

        dist: this._dist
      });

    this._isDrag = false;
  }

  leave() {
    let confirm = true,
      ts = Date.now() - this._time,
      dist = Math.abs(this._dist.y);

    if (ts > 300 && dist < 300) confirm = false;

    return confirm;
  }

  prevent() {
    let target = event.target,
      //selector = '#app-ui, #app-nav, #slider-nav, .scroller, .main-btn, .dg.ac',

      selector = [
        "#load",

        "#app-ui",

        "#app-nav",

        "#leaf-nav",

        "#slider-nav",

        ".simple-btn",

        ".main-btn",

        ".scroller",

        ".dg.ac"
      ].toString(),
      parents = target.parents(selector);

    //console.log( target, parents.length <= 0 )

    return parents.length <= 0;
  }

  get mouse() {
    return this._mouse;
  }

  get bus() {
    return this._bus;
  }
}

export default {
  install(Vue) {
    let swiper = new Swiper();

    Object.defineProperty(Vue.prototype, "$swiper", {
      get() {
        return swiper;
      }
    });
  }
};
