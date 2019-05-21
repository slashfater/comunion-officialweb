
<template>

	<div id="app-ui" :class="theme">

		<app-header ref="header"></app-header>

		<app-footer ref="footer"></app-footer>

		<app-lines ref="lines"></app-lines>

		<app-hamb ref="hamb"></app-hamb>

	</div>

</template>

<script>

import { Events } from '../../constants'

import Header from '../include/Header.vue'

import Footer from '../include/Footer.vue'

import Lines from '../include/Lines.vue'

import Hamb from '../include/Hamb.vue'

export default {

  name: 'AppUI',

  data () {
    return {

      theme: 'dark'
    }
  },

  components: {

    'app-header': Header,

    'app-footer': Footer,

    'app-lines': Lines,

    'app-hamb': Hamb
  },

  methods: {

    update (state) {
      if (state.theme !== undefined) { this.theme = state.theme }
    },

    enter () {
      return new TimelineMax({ tweens: [

        this.$refs.lines.enter(),

        this.$refs.header.enter(),

        this.$refs.footer.enter(),

        this.$refs.hamb.enter()

      ],
      stagger: 0.25 })
    }
  },

  created () {
    this.$bus.on(Events.UISTATE, this.update)
  },

  destroyed () {
    this.$bus.off(Events.UISTATE, this.update)
  }
}
</script>

<style lang="scss">

	#app-ui {

		position: static;
	}

</style>
