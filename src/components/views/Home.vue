
<template>

	<transition

    	@enter="enter"

    	@leave="leave"

    	:css="false">

		<section id="index" class="root">

			<router-view :key="slide" ref="slide"></router-view>

			<slider-nav ref="slideNav"></slider-nav>

			<!-- <counter ref="counter"></counter> -->

		</section>

	</transition>

</template>

<script>

import { Sizes } from '../../constants'

import Section from '../mixins/Section'

import Counter from '../include/Counter.vue'

import SliderNav from '../include/SliderNav.vue'

export default {

  name: 'Home',

  mixins: [ Section ],

  data () {
    return {

    }
  },

  computed: {

    slide () { return this.$route.params.slide },

    deskscreen () { return window.innerWidth > Sizes.CUSTOM - 1 }
  },

  components: {

    'slider-nav': SliderNav,

    'counter': Counter
  },

  methods: {

    leave (el, done) {
      return new TimelineMax({ tweens: [

        this.$refs.counter.current().leave(),

        this.$refs.slideNav.leave(),

        this.$refs.slide.leave()

      ],
      onComplete: done })
    },

    enter (el, done) {
      return new TimelineMax({ tweens: [

        this.$refs.slide.enter(),

        this.$refs.slideNav.enter(),

        // this.$refs.counter.current().enter()

      ],
      stagger: 0.5,
      onComplete: () => {
        // this.$refs.counter.play()

        if (done instanceof Function) { done() }
      } })
    }
  }
}
</script>

<style lang="scss">

	section.slide {

		&#projects {

			button.main-btn {

				margin: 30px auto 0;
			}
		}
	}

</style>
