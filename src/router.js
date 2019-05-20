import { States } from "./constants";

import Home from "./components/views/Home.vue";

import Projects from "./components/views/Projects.vue";

import Partners from "./components/views/Partners.vue";

import Contacts from "./components/views/Contacts.vue";

import Slide from "./components/views/Slide.vue";

import Leaf from "./components/views/Leaf.vue";

export default {
  mode: "history",

  base: "/",

  routes: [
    { path: "/contacts", name: States.CONTACTS, component: Contacts },

    { path: "/partners", name: States.PARTNERS, component: Partners },

    {
      path: "/",
      name: States.HOME,
      component: Home,
      children: [{ path: ":slide", name: States.SLIDER, component: Slide }]
    },

    {
      path: "/projects",
      name: States.PROJECTS,
      component: Projects,
      children: [{ path: ":leaf", name: States.LEAF, component: Leaf }]
    }
  ]
};
