
<template>

	<transition

		@enter="enter"

    	@leave="leave"

    	:css="false">

    	<div class="count" v-if="active">

    		<div class="label">
				<span class="font-reg">
					<span class="row" v-for="( row, i ) in model.label.split('<br />')" ref="rows"><span ref="lines">{{ row }}</span></span>
				</span>
    		</div>

    		<div class="num">
    			<span class="value" ref="value">
    				<span class="font-bold">{{ model.value }}</span>
    			</span>
    			<span class="type" ref="type">
    				<span class="font-bold">{{ model.type }}</span>
    			</span>
    		</div>

    	</div>

	</transition>

</template>

<script>

export default {

  name: 'Count',

  props: [ 'model', 'active' ],

  data () {
    return {

      refs: []
    }
  },

  methods: {

    leave (el, done) {
      let $el = this.$el

      let $refs = this.$refs

      let $type = $refs.type || $el.querySelector('.type') || { y: 0 }

      let $value = $refs.value || $el.querySelector('.value') || { y: 0 }

      return new TimelineMax({ tweens: [

        new TimelineMax({ tweens: [

          TweenMax.to($value, 1, { y: -50, force3D: true, ease: Cubic.easeInOut }),

          TweenMax.to($type, 1, { y: -50, force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.1 }),

        new TimelineMax({ tweens: [

          TweenMax.allTo($refs.rows, 1, { width: '0%', x: 150, ease: Cubic.easeInOut }, 0.08),

          TweenMax.allTo($refs.lines, 1, { x: -150, ease: Cubic.easeInOut }, 0.08)

        ] })

      ],
      onComplete: () => {
        if (done instanceof Function) { done() }
      } })
    },

    enter (el, done) {
      let $el = this.$el

      let $refs = this.$refs

      let $type = $refs.type || $el.querySelector('.type') || { y: 0 }

      let $value = $refs.value || $el.querySelector('.value') || { y: 0 }

      return new TimelineMax({ tweens: [

        new TimelineMax({ tweens: [

          TweenMax.from($value, 1, { y: 50, force3D: true, ease: Cubic.easeInOut }),

          TweenMax.from($type, 1, { y: 50, force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.1 }),

        new TimelineMax({ tweens: [

          TweenMax.allFrom($refs.rows, 1, { width: '0%', ease: Cubic.easeInOut }, 0.08)

        ] })

      ],
      stagger: 0.25,
      onComplete: () => {
        if (done instanceof Function) { done() }
      } })
    }
  }
}
</script>

<style lang="scss">

	.count {

		position: absolute;

		bottom: 0; left: 0; width: 150px;

		color: map-get( $colors, white );

		@media ( max-width: map-get( $sizes, custom ) - 1 ) {

			display: none;
		}

		.label {

			@include transform-origin( 0 0 );

			@include rotate( -90deg );

			margin-bottom: -10px;

			letter-spacing: map-get( $ls, s );

			opacity: .4;

			font: {

				size: map-get( $typo, p_ );
			}

			text: {

				transform: uppercase;
			}

			.row {

				position: relative;

				overflow: hidden;

				display: block;

				width: 100%;

				span {

					position: relative;

					display: block;

					width: 150px;
				}
			}
		}

		.num {

			position: relative;

			overflow: hidden;

			font: {

				size: 36px;
			}

			.value {

				position: relative;

				display: inline-block;
			}

			.type {

				position: relative;

				display: inline-block;
			}
		}
	}

</style>
