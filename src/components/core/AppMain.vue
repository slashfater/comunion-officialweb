
<template>

	<div id="app-main">

		<router-view ref="root"></router-view>

	</div>

</template>

<script>

import { mapState, mapActions } from 'vuex'

import { Actions, States } from '../../constants'

export default {

  name: 'AppMain',

  data () {
    return {

    }
  },

  methods: {

    leave (el, done) {
      let section = this.$refs.root

      return new TimelineMax({ tweens: [

        section.leave(el, done)

      ] })
    },

    enter (el, done) {
      let section = this.$refs.root

      return new TimelineMax({ tweens: [

        section.enter(el, done)

      ] })
    }
  }
}
</script>

<style lang="scss">

	// @import 'src/components/sass/vars.scss';

	#app-main {

		position: absolute;

		top: 0; left: 0; bottom: 0; right: 0;

		z-index: 3;
	}

	section.root {

		position: absolute;

		top: 0; left: 0; bottom: 0; right: 0;

		z-index: 1;

		.table {

			width: 100%; height: 100%;
		}

		h1 {

			position: relative;

			overflow: hidden;

			width: 100%;

			color: map-get( $colors, white );

			letter-spacing: map-get( $ls, m );

			font: {

				size: map-get( $typo, h1_ );
			}

			text: {

				transform: uppercase;

				align: center;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				font: {

					size: map-get( $typo, h1_ ) * 0.7;
				}
			}

			>span {

				position: relative;

				padding-left: 18px;

				span.letter {

					position: relative;

					display: inline-block;

					&.space {

						display: inline;
					}
				}
			}
		}

		h2 {

			position: relative;

			overflow: hidden;

			letter-spacing: map-get( $ls, s );

			color: map-get( $colors, white );

			line-height: 1em;

			font: {

				size: map-get( $typo, h2_ );
			}

			text: {

				transform: uppercase;

				align: center;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				font: {

					size: map-get( $typo, h2_ ) * 0.5;
				}
			}

			>span {

				position: relative;

				overflow: hidden;

				display: inline-block;

				span.letter {

					position: relative;

					display: inline-block;

					&.space {

						display: inline;
					}
				}
			}
		}

		h3 {

			position: relative;

			overflow: hidden;

			width: 100%;

			letter-spacing: map-get( $ls, s );

			font: {

				size: map-get( $typo, h3_ );
			}

			>span {

				position: relative;

				span.letter {

					position: relative;

					display: inline-block;

					&.space {

						display: inline;
					}
				}
			}
		}

		h4 {

			position: relative;

			overflow: hidden;

			width: 100%;

			color: map-get( $colors, white );

			letter-spacing: map-get( $ls, xs );

			line-height: 1.45em;

			font: {

				size: map-get( $typo, h4_ );
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				font: {

					size: map-get( $typo, p_ );
				}
			}
		}

		p {

			position: relative;

			overflow: hidden;

			width: 100%;

			letter-spacing: map-get( $ls, xs );

			line-height: 1.25em;

			font: {

				size: map-get( $typo, h4_ );
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				font: {

					size: map-get( $typo, p_ );
				}
			}
		}

		.side {

			position: absolute;

			overflow: hidden;

			top: 0; bottom: 0; width: 50%;

			.holder {

				position: absolute;

				overflow: hidden;

				top: 0; bottom: 0;

				left: 0; right: 0;
			}

			.side {

				position: relative;

				width: 100%;

				display: none;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					display: block;
				}

				.v-line {

					position: absolute;

				 	bottom: -40px; left: 50%;

					width: 0px; height: 50px;

					margin-left: -1px;

					background: {

						color: rgba(255,255,255,1);
					}
				}
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				left: 0; width: 100%;
			}

			.main.row {

				position: relative;

				padding: 0 60px 0 ( 60px + 90px );

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					padding: 0;
				}

				h2 {

					text: {

						align: left;
					}

					>span {

						margin-left: -2px;
					}
				}

				p {

					color: rgba(255,255,255,.5);

					margin-top: ( -10px + 40px * 2 );

					text: {

						transform: uppercase;

						align: justify;
					}

					@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				    	margin-top: 35px;
					}

					span {

						position: relative;

						display: inline-block;
					}
				}

				.line {

					position: absolute;

				 	top: 89px; left: ( 60px + 90px );

					width: 100px; height: 2px;

					@include transform-origin( 0% 0% );

					background: {

						color: rgba(255,255,255,.3);
					}

					@media ( max-width: map-get( $sizes, custom ) - 1 ) {

						left: 0; top: 45px;
					}
				}
			}

			&.left {

				left: 0;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					display: none;
				}
			}

			&.right {

				right: 0;
			}
		}
	}

</style>
