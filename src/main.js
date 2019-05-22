import "./polyfill";

import "babel-polyfill";

import Vue from "vue";

import Vuex from "vuex";

import VueBus from "vue-bus";

import VueRouter from "vue-router";

import App from "./components/App.vue";

import Resizer from "./plugins/resizer/";

import Ticker from "./plugins/ticker/";

import Swiper from "./plugins/swiper/";

import Sender from "./plugins/sender/";

import Wheel from "./plugins/wheel/";

import Mixer from "./plugins/mixer/";

import TweenMax from "gsap";

import modules from "./store";

import manifest from "./manifest";

import AppRouter from "./router";

import LoaderManager from "./loaders/LoaderManager";

import { Events, States } from "./constants";

Vue.use(Vuex);

Vue.use(VueBus);

Vue.use(VueRouter);

Vue.use(Ticker);

Vue.use(Swiper);

Vue.use(Wheel);

Vue.use(Mixer);

Vue.use(Sender);

Vue.use(Resizer);

let store = new Vuex.Store({ modules, strict: true });

let router = new VueRouter(AppRouter);

router.beforeEach((to, from, next) => {
  router.data = { to, from };

  let collections = store.getters.collections;
  let slider = collections.slider;
  let slide = to.params.slide || "";
  let leaf = to.params.leaf || "";
  let validate = slider.indexOfName(slide);

  if ((to.name == States.SLIDER && validate < 0) || to.name == States.HOME) {
    return next({ name: States.SLIDER, params: { slide: slider[0].name } });
  }
  // console.log( to.name, States.HOME, States.SLIDER )
  else next();

  let loaded = store.getters.loaded;

  if (!loaded) {
    let loaderManager = new LoaderManager();

    loaderManager.bus.on(Events.PROGRESS, progress =>
      store.dispatch(Events.PROGRESS, progress)
    );

    loaderManager.bus.on(Events.LOADED, response =>
      store.dispatch(Events.LOADED, response)
    );

    loaderManager.bus.on(Events.LOCALE, response =>
      store.dispatch(Events.LOCALE, response)
    );

    loaderManager.load(manifest);
  }
});

let app = new Vue({
  store,
  router,

  el: "#application",

  render: h => h(App)
});
