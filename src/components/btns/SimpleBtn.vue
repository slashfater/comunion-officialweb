
<template>

	<button class="simple-btn" @click="click" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<span class="wrap" ref="wrap">
			<span ref="slot"><slot></slot></span>
			<span class="line" ref="line"></span>
		</span>
	</button>

</template>

<script>

export default {

  name: 'SimpleBtn',

  props: [ 'click' ],

  data () {
    return {

      removed: false
    }
  },

  methods: {

    mouseenter (event) {
      if (this.removed) return

      this.$mixer.play('tic')

      let $refs = this.$refs

      return new TimelineMax({ tweens: [

        TweenMax.to($refs.line, 0.8, { scaleX: 0, ease: Cubic.easeOut })

      ] })
    },

    mouseleave (event) {
      if (this.removed) return

      let $refs = this.$refs

      return new TimelineMax({ tweens: [

        TweenMax.to($refs.line, 0.8, { scaleX: 1, ease: Cubic.easeOut })

      ] })
    }
  },

  destroyed () {
    this.removed = true
  }
}
</script>

<style lang="scss">

	button.simple-btn {

		position: relative;

		overflow: hidden;

		display: block;

		color: map-get( $colors, white );

		letter-spacing: map-get( $ls, s ) * 1.25;

    	line-height: 1.45em;

		margin: 0 auto;

		padding: 5px;

		cursor: pointer;

		background: none;

		font: {

			size: map-get( $typo, btn_ );
		}

		text: {

			transform: uppercase;
		}

		@media ( max-width: map-get( $sizes, custom ) - 1 ) {

			font: {

				size: map-get( $typo, btn_ ) - 2;
			}
		}

		.wrap {

			position: relative;

			padding: 20px 50px;

    		display: block;

			width: 100%; height: 100%;

			.line {

				position: absolute;

				left: 60px; right: 62px; bottom: 0; height: 1px;
			}
		}

		&.red {

			.wrap {

				.line {

					background: {

						color: map-get( $colors, red );
					}
				}
			}
		}
	}

</style>
