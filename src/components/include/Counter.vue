
<template>

	<div id="counter">

		<count v-for="( model, i ) in collection" :model="model" :active="i == index" ref="counts"></count>

	</div>

</template>

<script>

import { mapState } from 'vuex'

import Count from './Count.vue'

export default {

  name: 'Counter',

  data () {
    return {

      delay: 5000,

      index: 0,

      timer: 0
    }
  },

  computed: {

    ...mapState({

      locale: state => state.site.locale
    }),

    collection () { return this.locale.counter },

    length () { return this.collection.length }
  },

  components: {

    'count': Count
  },

  methods: {

    play () {
      this.timer = setTimeout(this.update.bind(this), this.delay)
    },

    update () {
      ++this.index

      if (this.index >= this.length) { this.index = 0 }

      this.play()
    },

    stop () {
      clearTimeout(this.timer)
    },

    current () {
      let current

      for (let count of this.$children) {
        if (count.active) { current = count }
      }

      return current
    }
  },

  mounted () {

    // this.play()
  },

  destroyed () {
    this.stop()
  }
}
</script>

<style lang="scss">

	#counter {

		position: absolute;

		left: 90px + 40px; bottom: 34px;

		z-index: 2;
	}

</style>
