import { Actions, Events } from "./constants";

export default {
  site: {
    state: {
      progress: -1,

      loaded: false,

      locale: undefined,

      assets: undefined,

      projects: undefined,

      partners: undefined,

      user: {
        name: "",

        email: "",

        message: ""
      },

      collections: {
        tree: [
          { label: "Home", name: "slider", ref: "home", path: "/home" },

          {
            label: "Projects",
            name: "projects",
            ref: "projects",
            path: "/projects",
            leaf: "the-gate"
          },

          {
            label: "Partners",
            name: "partners",
            ref: "partners",
            path: "/partners"
          },

          {
            label: "Contacts",
            name: "contacts",
            ref: "contacts",
            path: "/contacts"
          }
        ],

        slider: [
          { label: "Home", name: "home", path: "/home" },

          { label: "Who", name: "who", path: "/who" },

          { label: "Vision", name: "vision", path: "/vision" },

          { label: "Mission", name: "mission", path: "/mission" },

          { label: "Projects", name: "projects", path: "/projects" }
        ]
      }
    },

    getters: {
      loaded: state => state.loaded,

      collections: state => state.collections
    },

    actions: {
      [Events.LOCALE](context, value) {
        context.commit(Events.LOCALE, value);
      },

      [Events.LOADED](context, value) {
        context.commit(Events.LOADED, value);
      },

      [Events.PROGRESS](context, value) {
        context.commit(Events.PROGRESS, value);
      },

      [Actions.UPDATE_USER](context, value) {
        context.commit(Actions.UPDATE_USER, value);
      }
    },

    mutations: {
      [Events.LOCALE](state, value) {
        state.locale = JSON.parse(value); // value | JSON.parse( value )
      },

      [Events.LOADED](state, value) {
        state.assets = value.assets;

        state.projects = JSON.parse(value.projects); // value.projects | JSON.parse( value.projects )

        state.partners = JSON.parse(value.partners); // value.partners | JSON.parse( value.partners )

        state.loaded = true;
      },

      [Events.PROGRESS](state, value) {
        state.progress = value;
      },

      [Actions.UPDATE_USER](state, value) {
        state.user = Object.assign(state.user, value);
      }
    }
  }
};
