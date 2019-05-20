import { Events } from "../../constants";

class Ticker {
  constructor(options) {
    this._name = "Ticker";

    this._listenersCount = 0;
  }

  fps(value) {
    // useraf

    TweenMax.ticker.useRAF(true);

    TweenMax.ticker.fps(value);
  }

  /**
   * addEventListener( type, callback, scope, useParam, priority )
   */
  add(callback) {
    TweenMax.ticker.addEventListener(
      Events.TICK,
      callback,
      null,
      true,
      ++this._listenersCount
    );
  }

  remove(callback) {
    TweenMax.ticker.removeEventListener(Events.TICK, callback);

    --this._listenersCount;
  }

  get name() {
    return this._name;
  }
}

export default {
  install(Vue) {
    let ticker = new Ticker();

    Object.defineProperty(Vue.prototype, "$ticker", {
      get() {
        return ticker;
      }
    });
  }
};
