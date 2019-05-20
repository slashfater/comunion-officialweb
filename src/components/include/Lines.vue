
<template>

	<div id="lines">
		
		<div class="left-line line">
			
			<div class="s-line top"></div>

			<div class="g-line"></div>

			<div class="s-line bot"></div>

		</div>

		<div class="middle-line line">
			
			<div class="g-line"></div>

		</div>

		<div class="right-line line">
			
			<div class="s-line top"></div>

			<div class="g-line"></div>

			<div class="s-line bot"></div>

		</div>

	</div>

</template>

<script>
	
	export default {

		name: 'Lines',

		data () {
	
			return {

			}
		},

		methods: {

			enter () {

				let $lines = this.$el.querySelectorAll( '.line' ).reverse()

				return new TimelineMax( { tweens: [

					TweenMax.allFrom( $lines, 2, { scaleY: 0, ease: Expo.easeInOut }, .15 )

					] } )
			}
		}
	}
</script>

<style lang="scss">

	#lines {

		position: static;

		.line {
			
			position: absolute;

			top: 0; bottom: 0;

			pointer-events: none;

			width: 2px;

			z-index: 2;

			margin: {

				left: -1px;
			}

			@include transform-origin( 0% 100% );

			.g-line {

				position: absolute;

				top: 0; left: 0; right: 0; bottom: 0;

				opacity: 0.1;

				background: {

					color: map-get( $colors, white );
				}

				@include transition( background-color .8s map-get( $ease, cubic_out ) );
			}

			.s-line {

				position: absolute;

				left: 0; right: 0;

				height: 5px;

				background: {

					color: map-get( $colors, white );
				}

				@include transition( background-color .8s map-get( $ease, cubic_out ) );

				&.top {

					top: 0;
				}

				&.bot {

					bottom: 0;
				}
			}

			&.left-line {

				left: 90px;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					display: none;
				}
			}

			&.right-line {

				right: 90px;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					display: none;
				}
			}

			&.middle-line {

				left: 50%;
			}
		}

		.light & {

			.line .g-line, .line .s-line {

				background: {

					color: map-get( $colors, gray );
				}
			}
		}
	}

</style>