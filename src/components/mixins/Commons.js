import { States } from '../../constants'

export default {
  computed: {
    projects () {
      return this.$store.state.site.projects
    },

    tree () {
      return this.$store.state.site.collections.tree
    },

    slider () {
      return this.$store.state.site.collections.slider
    },

    current () {
      return this.tree.indexOfName(this.$route.name)
    },

    sid () {
      return this.slider.indexOfName(this.slide)
    },

    lid () {
      return this.projects.indexOfName(this.leaf)
    },

    slide () {
      return this.$route.params.slide
    },

    leaf () {
      return this.$route.params.leaf
    }
  },

  methods: {
    navigateTo (name, params) {
      this.$router.push({ name, params })
    },

    toggleLang () {
      let href = window.location.href
      let lang =
          window.appconf.lang == 'en' || window.appconf.lang == ''
            ? 'en'
            : 'cn'
      let newlang = lang == 'cn' ? 'en' : 'cn'

      // route = href.replace( lang, newlang )

      window.location.href = newlang
    },

    normalize (name) {
      if (name == States.LEAF) name = States.PROJECTS

      return name
    }
  }
}
