<template>

	<div id="stats">{{ }}</div>

</template>

<script>

export default {

  name: 'Stats',

  methods: {

    render () {
      if (this.stats) { this.stats.update() }
    }
  },

  mounted () {
    this.stats = new Stats()

    this.$el.appendChild(this.stats.dom)

    this.$ticker.add(this.render)
  }
}
</script>

<style lang="scss">

	#stats {

		position: fixed;

		bottom: 0; left: 5px;

		z-index: 99 !important;

		>div {

			position: relative !important;
		}

		@media ( max-width: map-get( $sizes, custom ) - 1 ) {

			display: none;
		}
	}

</style>
