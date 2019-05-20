
<template>

	<div class="quote" :class="config">
		
		<span class="background">
			<span class="color" ref="color"></span>
			<span class="fill" ref="fill"></span>
		</span>
		
		<p><span class="font-reg" v-html="model.content" ref="text"></span></p>

	</div>

</template>

<script>

	import Compo from './Compo'
	
	export default {

		name: 'QuoteLeaf',

		mixins: [ Compo ],

		props: [ 'model' ],

		data () {
		
			return {

			}
		},

		mounted () {

			this.timeline = new TimelineMax( { tweens: [

				TweenMax.from( this.$refs.color, 1, { y: '100%', force3D: true, ease: Cubic.easeOut } ),
				
				TweenMax.from( this.$refs.fill, 1, { y: '100%', force3D: true, ease: Cubic.easeOut } ),

				TweenMax.from( this.$refs.text, 1, { y: '100%', force3D: true, ease: Cubic.easeOut } )

				], stagger: .1, paused: true } )
		},

		destroyed () {

			if ( this.timeline ) {

				this.timeline.kill()

				this.timeline = null
			}
		}
	}
</script>

<style lang="scss">
	
	@import 'src/components/sass/vars.scss';

	section.leaf .quote {

		position: relative;
		
		text-align: left;
			
		padding: 50px 120px 50px 60px;

		.background {

			position: absolute;

			top: 0; left: 0; right: 0; bottom: 0;

			z-index: 1;

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
			
		p {
			z-index: 2;

			font: {

				size: map-get( $typo, q_ );
			}

			text: {

				transform: uppercase;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				font: {

					size: map-get( $typo, q_ ) - 4;
				}
			}

			span {

				display: inline-block;
			}
		}

		&.left {

			text-align: left;
			
			padding: 50px 120px 50px 60px;
		}

		&.right {

			text-align: right;

			padding: 50px 60px 50px 120px;	
		}

		&.left, &.right { 

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				padding: 50px;  	
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

			p {

				color: rgba( 212,212,212,1 );
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

			p {

				color: map-get( $colors, white );
			}
		}

		&.none {
			
			.background {

				.color, .fill {

					background: none;
				}
			}
		}
	}

</style>