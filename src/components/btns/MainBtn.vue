
<template>

	<button class="main-btn" @click="click" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<span class="wrap" ref="wrap">
			<span class="line lt" ref="lt"></span>
			<span class="line lb" ref="lb"></span>
			<span class="line ll" ref="ll"></span>
			<span class="line lr" ref="lr"></span>
			<span ref="slot"><slot></slot></span>
		</span>
	</button>

</template>

<script>
	
	export default {

		name: 'MainBtn',

		props: [ 'click' ],

		data () {
	
			return {

				removed: false
			}
		},

		methods: {

			mouseenter ( event ) {

				if ( this.removed ) return
					

				if ( this.timeline )

					this.timeline.kill()


				this.$mixer.play( 'hover' )

				
				let $refs = this.$refs

				this.timeline = new TimelineMax( { tweens: [

					TweenMax.to( $refs.slot, 1, { opacity: .35, ease: Cubic.easeOut } ),

					new TimelineMax( { tweens: [

						TweenMax.to( $refs.lt, .4, { bezier: { values:[ { left: '8%', width: 50 }, { left: '0%', width: 10 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
						TweenMax.to( $refs.lb, .4, { bezier: { values:[ { right: '8%', width: 50 }, { right: '0%', width: 10 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
						TweenMax.to( $refs.ll, .4, { top: '0%', bezier: { values:[ { height: 20 }, { height: 10 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
						TweenMax.to( $refs.lr, .4, { bottom: '0%', bezier: { values:[ { height: 20 }, { height: 10 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

						], stagger: .03 } )
					
					] } )
			},

			mouseleave ( event ) {

				if ( this.removed ) return

				
				if ( this.timeline )

					this.timeline.kill()


				let $refs = this.$refs

				this.timeline = new TimelineMax( { tweens: [

					new TimelineMax( { tweens: [

						TweenMax.to( $refs.lr, .6, { bottom: '60%', bezier: { values:[ { height: 20 }, { height: 10 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
						TweenMax.to( $refs.ll, .6, { top: '60%', bezier: { values:[ { height: 20 }, { height: 10 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
						TweenMax.to( $refs.lb, .6, { bezier: { values:[ { right: '8%', width: 50 }, { right: '15%', width: 40 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
						TweenMax.to( $refs.lt, .6, { bezier: { values:[ { left: '8%', width: 50 }, { left: '15%', width: 40 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

						], stagger: .03 } ),

					TweenMax.to( $refs.slot, 1, { opacity: 1, ease: Cubic.easeOut } )

					] } )
			}
		},

		destroyed () {

			this.removed = true
		}
	}
</script>

<style lang="scss">
	
	button.main-btn {
	
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

    		border: 1px solid;

    		display: block;

			width: 100%; height: 100%;
		}

		.line {

			position: absolute;

			background: {

				color: map-get( $colors, red );
			}

			&.lt, &.lb {

				width: 40px; height: 1px;	
			}

			&.ll, &.lr {

				width: 1px; height: 10px;	
			}

			&.lt {
				
				left: 15%; top: -1px;
			}

			&.lb {
				
				right: 15%; bottom: -1px;
			}
			
			&.ll {
				
				left: -1px; top: 60%;
			}
			
			&.lr {
				
				right: -1px; bottom: 60%;
			}
		}

		&.red {
			
			.wrap {

				border-color: map-get( $colors, rgb_light_red );
			}
		}
	}

</style>