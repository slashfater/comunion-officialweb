
<template>

	<div class="tbox" :class="config">

		<span class="background left">
			<span class="color" ref="leftColor"></span>
			<span class="fill" ref="leftFill"></span>
		</span>

		<span class="background right">
			<span class="color" ref="rightColor"></span>
			<span class="fill" ref="rightFill"></span>
		</span>

		<div class="side">
			<h2>
				<span class="font-reg">
					<span class="letter" ref="letters">{{ model.title }}</span>
					<!--span class="letter" v-for="letter in model.title" :class="{ 'space': letter == ' ' }" ref="letters">{{ letter }}</span-->
				</span>
			</h2>
			<span class="line" ref="line"></span>
		</div>

		<div class="side">
			<p><span class="font-reg" v-html="model.content" ref="text"></span></p>
		</div>

	</div>

</template>

<script>

import Compo from './Compo'

export default {

  name: 'TboxLeaf',

  mixins: [ Compo ],

  props: [ 'model' ],

  data () {
    return {

    }
  },

  mounted () {
    this.timeline = new TimelineMax({ tweens: [

      new TimelineMax({ tweens: [

        TweenMax.from(this.$refs.rightColor, 1, { y: '100%', force3D: true, ease: Cubic.easeOut }),

        TweenMax.from(this.$refs.rightFill, 1, { y: '100%', force3D: true, ease: Cubic.easeOut })

      ],
      stagger: 0.1 }),

      new TimelineMax({ tweens: [

        TweenMax.from(this.$refs.leftColor, 1, { y: '100%', force3D: true, ease: Cubic.easeOut }),

        TweenMax.from(this.$refs.leftFill, 1, { y: '100%', force3D: true, ease: Cubic.easeOut })

      ],
      stagger: 0.1 }),

      TweenMax.from(this.$refs.text, 1, { opacity: 0, y: '50%', force3D: true, ease: Cubic.easeOut }),

      TweenMax.from(this.$refs.line, 1, { scaleX: 0, ease: Cubic.easeOut }),

      TweenMax.from(this.$refs.letters, 1, { y: '100%', force3D: true, ease: Cubic.easeOut })

    ],
    stagger: 0.14,
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

	section.leaf .tbox {

		position: relative;

		overflow: hidden;

		.background {

			position: absolute;

			top: 0; bottom: 0;

			width: 50%;

			z-index: 1;

			&.left {

				left: 0;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					width: 100%;
				}
			}

			&.right {

				right: 0;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					display: none;
				}
			}

			.color, .fill {

				position: absolute;

				bottom: 0; left: 0;

				width: 100%; height: 100%;
			}

			.color {

				z-index: 1;

				background: {

					color: map-get( $colors, red );
				}
			}

			.fill {

				z-index: 2;
			}
		}

		h2 {

   			color: rgba( 79,79,79,1 );

		    letter-spacing: 0.1em;

	        padding: 100px 60px;

	        margin-top: -5px;

	        text: {

				align: left;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				padding: 50px 50px 0;

	        	margin-top: 0;
			}
		}

		p {

			color: rgba( 79,79,79,.5 );

			padding: 100px 60px;

			text: {

				transform: uppercase;

				align: justify;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				padding: 50px;
			}

			span {

				display: inline-block;
			}
		}

		.side {

			position: relative;

			width: 50%;

			z-index: 2;

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				width: 100%;
			}

			.line {

				position: absolute;

				bottom: 100px; left: 60px;

				width: 100px; height: 2px;

			    margin-bottom: -30px;

			    @include transform-origin( 0 0 );

				background: {

					color: map-get( $colors, dark );
				}

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					width: 65px;

				    margin-bottom: -15px;

					bottom: 0; left: 50px;
				}
			}
		}

		&.left {

			.side {

				float: left;
			}
		}

		&.right {

			.side {

				float: right;
			}
		}

		&.light {

			.background {

				.fill {

					background: {

						color: map-get( $colors, white );
					}
				}
			}

			h2 {

				color: rgba( 79,79,79,1 );
			}
		}

		&.dark {

			.background {

				.fill {

					background: {

						color: map-get( $colors, dark );
					}
				}
			}

			h2 {

				color: map-get( $colors, white );
			}

			p {

				color: rgba( 255,255,255,.4 );
			}

			.line {

				background: {

					color: map-get( $colors, white );
				}
			}
		}

		&.none {

			&.light {

				&.left {

					.background.left {

						.color, .fill {

							background: none;
						}

						.color {

							@media ( max-width: map-get( $sizes, custom ) - 1 ) {

								background: {

									color: map-get( $colors, red );
								}
							}
						}

						.fill {

							@media ( max-width: map-get( $sizes, custom ) - 1 ) {

								background: {

									color: map-get( $colors, white );
								}
							}
						}
					}
				}

				&.right {

					.background.right {

						.color, .fill {

							background: none;
						}
					}
				}
			}

			&.dark {

				&.left {

					.background.left {

						.color, .fill {

							background: none;
						}
					}
				}

				&.right {

					.background.right {

						.color, .fill {

							background: none;
						}
					}
				}

				h2 {

					color: rgba( 79,79,79,1 );
				}

				.line {

					background: {

						color: map-get( $colors, dark );
					}
				}

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					h2 {

						color: map-get( $colors, white );
					}

					.line {

						background: {

							color: map-get( $colors, white );
						}
					}
				}
			}
		}
	}

</style>
