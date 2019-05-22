<template>

	<section id="application" class="unselectable">

		<root></root>

		<load></load>

	</section>

</template>

<script>

import Root from './Root.vue'

import Load from './Load.vue'

export default {

  name: 'App',

  data () {
    return {

    }
  },

  components: {

    'root': Root,

    'load': Load
  }
}
</script>

<style lang="scss">

	// @import 'src/components/sass/utils.scss';

	// @import 'src/components/sass/vars.scss';

	#application {

		position: absolute;

		top: 0; left: 0; bottom: 0; right: 0;

		@media only screen and (max-width: 812px) and (min-aspect-ratio: 13/9) {

		    & { visibility: hidden; opacity: 0; }
		}
	}

</style>
