export default {
  computed: {
    side () {
      return this.model.side || ''
    },

    theme () {
      return this.model.theme || ''
    },

    background () {
      return this.model.background || ''
    },

    config () {
      return this.background + ' ' + this.theme + ' ' + this.side
    }
  },

  methods: {
    leave () {
      if (this.timeline) this.timeline.reverse()
    },

    enter () {
      if (this.timeline) this.timeline.play()
    }
  }
}
