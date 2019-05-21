
<template>

	<transition

		@enter="enter"

    	@leave="leave"

    	:css="false">

		<div id="load" v-if="!ready">

			<div class="table">
				<div class="table-cell">

					<cookies ref="cookies"></cookies>

					<button :class="{ 'active': loaded }" class="accept-btn" v-if="locale" @click="accept" @mouseenter="mouseenter" @mouseleave="mouseleave">
						<span class="wrap" ref="wrap">
							<span class="loading font-reg" ref="loading">{{ locale.ui.loading +' '+ vprogress }}</span>
							<span class="accept font-reg" ref="accept">{{ locale.cookies.accept }}</span>
						</span>
						<span class="line" ref="line"></span>
					</button>

				</div>
			</div>

		</div>

	</transition>

</template>

<script>

import { mapState } from 'vuex'

import { Actions } from '../constants'

import Cookies from './include/Cookies.vue'

export default {

  name: 'Load',

  data () {
    return {

      ready: false
    }
  },

  computed: {

    ...mapState({

      progress: state => state.site.progress,

      loaded: state => state.site.loaded,

      locale: state => state.site.locale
    }),

    vprogress () { return Math.round(this.progress * 100) + '%' },

    mobile () { return isMobile.any }
  },

  components: {

    'cookies': Cookies
  },

  watch: {

    progress (value) {
      TweenMax.to(this.$refs.line, 1, { scaleX: value, delay: 0.1, ease: Cubic.easeOut })
    },

    loaded (value) {
      let $refs = this.$refs

      if (value) { this.$bus.emit(Actions.APP_READY) }
      this.ready = true

      new TimelineMax({ tweens: [

        $refs.cookies.enter(),

        new TimelineMax({ tweens: [

          TweenMax.to($refs.loading, 1, { y: '-100%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.to($refs.accept, 1, { y: '0%', force3D: true, ease: Cubic.easeInOut })

        ] })

      ],
      stagger: 0.25,
      delay: 1 })
    }
  },
  mounted () {

  },

  methods: {

    mouseenter (event) {
      if (!this.loaded || this.mobile) return

      TweenMax.to(this.$refs.line || { scaleX: 1 }, 0.8, { scaleX: 0, ease: Cubic.easeOut })
    },

    mouseleave (event) {
      if (!this.loaded || this.mobile) return

      TweenMax.to(this.$refs.line || { scaleX: 0 }, 0.8, { scaleX: 1, ease: Cubic.easeOut })
    },

    accept () {
      if (!this.loaded) return

      this.$bus.emit(Actions.APP_READY)

      this.ready = true
    },

    leave (el, done) {
      let $accept = this.$el.querySelector('.accept-btn .accept')

      let $copy = this.$el.querySelector('#cookies .copy')

      let $cta = this.$el.querySelector('#cookies .cta')

      let $line = this.$el.querySelector('.line')

      return new TimelineMax({ tweens: [

        new TimelineMax({ tweens: [

          new TimelineMax({ tweens: [

            TweenMax.to($accept, 0.8, { y: '100%', force3D: true, ease: Cubic.easeOut }),

            TweenMax.to($line, 0.8, { scaleX: 0, ease: Cubic.easeOut })

          ] }),

          TweenMax.to($cta, 0.8, { y: '100%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.to($copy, 0.8, { y: '100%', force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.08 }),

        TweenMax.to(this.$el, 2, { autoAlpha: 0, ease: Cubic.easeInOut })

      ],
      stagger: 1,
      onComplete: () => {
        if (done instanceof Function) { done() }
      } })
    },

    enter (el, done) {
      done()
    }
  }
}
</script>

<style lang="scss">

	#load {

		position: absolute;

		top: 0; left: 0; right: 0; bottom: 0;

		z-index: 99;

		background: {

			color: map-get( $colors, black );
		}

		text: {

			align: center;
		}

		.table {

			width: 100%; height: 100%;
		}

		button.accept-btn {

			position: relative;

			color: map-get( $colors, white );

			letter-spacing: map-get( $ls, s ) * 1.5;

			background: none;

			cursor: default;

			font: {

				size: map-get( $typo, btn_ );
			}

			text: {

				transform: uppercase;
			}

			&.active {

				cursor: pointer;
			}

			.wrap {

				position: relative;

				overflow: hidden;

	    		display: block;

				width: 100%; height: 100%;

				span {

					position: relative;

					display: inline-block;

					padding: 10px 45px 10px 45px; //padding: 10px 38px 10px 45px;

					&.loading {

					}

					&.accept {

						position: absolute;

						top: 0; left: 0;

						width: 100%; height: 100%;

						@include translate( 0, 100% );
					}
				}
			}

			.line {

				position: absolute;

				bottom: -10px; left: 0; right: 0; height: 1px;

				@include scale( 0, 1 );

				background: {

					color: map-get( $colors, red );
				}
			}
		}
	}

</style>
