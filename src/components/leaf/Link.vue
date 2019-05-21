
<template>

	<div class="link">

		<main-btn class="red" :click="discover">
			<span class="font-bold" v-html="model.content">{{ }}</span>
		</main-btn>

	</div>

</template>

<script>

import Compo from './Compo'

import MainBtn from '../btns/MainBtn.vue'

export default {

  name: 'LinkLeaf',

  mixins: [ Compo ],

  props: [ 'model' ],

  data () {
    return {

    }
  },

  components: {

    'main-btn': MainBtn
  },

  methods: {

    discover () {
      console.log('discover')
    }
  },

  mounted () {
    this.timeline = new TimelineMax({ tweens: [

      TweenMax.from(this.$el, 1, { opacity: 0, y: 60, force3D: true, ease: Cubic.easeOut })

    ],
    paused: true })
  },

  destroyed () {
    if (this.timeline) {
      this.timeline.kill()

      this.timeline = null
    }
  }
}
</script>

<style lang="scss">

	@import 'src/components/sass/vars.scss';

	section.leaf .link {

		padding: 0 50px;

		.main-btn {

			margin: 100px auto;

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				margin: 50px auto;
			}

			span.font-bold {

				color: rgba( 212,212,212,1 );

				span {

					color: rgba( 79,79,79,1 );
				}
			}
		}
	}

</style>
