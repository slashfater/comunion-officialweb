
<template>

	<div id="hamb">
		
		<div class="open" ref="open">
			
			<div class="icon" @click="toggle" @mouseenter="openMouseenter" @mouseleave="openMouseleave" ref="openIcon">

				<div class="line-top">
					<div class="line-1" ref="openLineTop1"><span></span></div>
					<div class="line-2" ref="openLineTop2"><span></span></div>
				</div>
				<div class="line-bot">
					<div class="line-1" ref="openLineBot1"><span></span></div>
					<div class="line-2" ref="openLineBot2"><span></span></div>	
				</div>

			</div>

			<div class="label" @click="toggle" @mouseenter="openMouseenter" @mouseleave="openMouseleave">
				<span ref="openLabel">
					<span class="holder">
						<span class="font-reg">{{ locale.ui.menu }}</span>
						<span class="open font-reg">{{ locale.ui.open }}</span>
					</span>
				</span>
			</div>

		</div>
		
		<div class="close" ref="close">
			
			<div class="icon" @click="toggle" @mouseenter="closeMouseenter" @mouseleave="closeMouseleave" ref="closeIcon">
				
				<div class="line-top">
					<div class="line-1" ref="closeLineTop1"><span></span></div>
					<div class="line-2" ref="closeLineTop2"><span></span></div>
				</div>
				<div class="line-bot">
					<div class="line-1" ref="closeLineBot1"><span></span></div>
					<div class="line-2" ref="closeLineBot2"><span></span></div>	
				</div>

			</div>

			<div class="label" @click="toggle" @mouseenter="closeMouseenter" @mouseleave="closeMouseleave">
				<span ref="closeLabel">
					<span class="holder">
						<span class="font-reg">{{ locale.ui.close }}</span>
						<span class="close font-reg">{{ locale.ui.close }}</span>
					</span>
				</span>
			</div>

		</div>

	</div>

</template>

<script>
	
	import { mapState } from 'vuex'
	
	import { Actions } from '../../constants'

	export default {

		name: 'Hamb',

		data () {
	
			return {

				isOpen: false
			}
		},

		computed: {

			...mapState( {

				locale: state => state.site.locale
			} ),

			mobile () { return isMobile.any }
		},

		watch: {

			$route: function ( to, from ) {

				if ( this.isOpen )

					this.isOpen = false
			},

			isOpen ( value ) {

				if ( this.timeline )

					this.timeline.kill()

				

				let $refs = this.$refs

				
				TweenMax.set( $refs.openLineTop1, { height: 12, y: 0 } )
				
				TweenMax.set( $refs.openLineBot1, { height: 32, y: 0 } )

				TweenMax.set( $refs.openLineTop2, { height: 0, y: 12  } )
				
				TweenMax.set( $refs.openLineBot2, { height: 0, y: 12 } )


				TweenMax.set( $refs.closeLineTop1, { scaleY: 1, y: 0 } )
				
				TweenMax.set( $refs.closeLineBot1, { scaleY: 1, y: 0 } )

				TweenMax.set( $refs.closeLineTop2, { scaleY: 0, y: 25 } )
				
				TweenMax.set( $refs.closeLineBot2, { scaleY: 0, y: 25 } )

				
				if ( value ) 

					this.timeline = new TimelineMax( { tweens: [

						new TimelineMax( { tweens: [
						
							TweenMax.to( $refs.openLabel, .8, { x: 50, force3D: true, ease: Cubic.easeInOut } ),

							TweenMax.to( $refs.closeLabel, .8, { x: 0, force3D: true, ease: Cubic.easeInOut } )

							], stagger: .1 } ),

						new TimelineMax( { tweens: [

							new TimelineMax( { tweens: [
								
								TweenMax.to( $refs.openLineTop1, .6, { bezier: { values:[ { height: 32, y: 0 }, { height: 0, y: -37 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
							
								TweenMax.to( $refs.openLineBot1, .6, { bezier: { values:[ { height: 32, y: 0 }, { height: 0, y: -37 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )
			
								], stagger: .1 } ),

							new TimelineMax( { tweens: [

								TweenMax.fromTo( $refs.closeLineTop1, .6, { scaleY: 0, y: 25 }, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 1, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
							
								TweenMax.fromTo( $refs.closeLineBot1, .6, { scaleY: 0, y: 25 }, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 1, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

								], onStart: () => {

									TweenMax.set( $refs.closeIcon, { autoAlpha: 1 } )

								}, stagger: .1 } )

							], stagger: .2 } )

						] } )

				else this.timeline = new TimelineMax( { tweens: [

						new TimelineMax( { tweens: [
						
							TweenMax.to( $refs.closeLabel, .8, { x: -50, force3D: true, ease: Cubic.easeInOut } ),

							TweenMax.to( $refs.openLabel, .8, { x: 0, force3D: true, ease: Cubic.easeInOut } )

							], stagger: .1 } ),

						new TimelineMax( { tweens: [

							new TimelineMax( { tweens: [
	
								TweenMax.to( $refs.closeLineTop1, .6, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 0, y: 25 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),

								TweenMax.to( $refs.closeLineBot1, .6, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 0, y: 25 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

								], onComplete: () => {

									TweenMax.set( $refs.closeIcon, { autoAlpha: 0 } )

								}, stagger: .1 } ),

							new TimelineMax( { tweens: [
	
								TweenMax.fromTo( $refs.openLineTop1, .6, { height: 0, y: -37 }, { bezier: { values:[ { height: 32, y: 0 }, { height: 12, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),

								TweenMax.fromTo( $refs.openLineBot1, .6, { height: 0, y: -37 }, { bezier: { values:[ { height: 32, y: 0 }, { height: 32, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )
									
								], stagger: .1 } )

							], stagger: .2 } )

						] } )
			}
		},

		methods: {

			open () {

				this.isOpen = true
			},

			close () {

				this.isOpen = false
			},

			toggle () {

				if ( this.isOpen ) {

					this.$bus.emit( Actions.CLOSE_MENU )

					this.close()
				
				} else {

					this.$bus.emit( Actions.OPEN_MENU )

					this.open()
				}
			},

			openMouseenter ( event ) {

				if ( this.isOpen || this.mobile ) return


				this.$mixer.play( 'tic' )


				let $refs = this.$refs,

					$target = $refs.open,

					$holder = $target.querySelector( '.holder' )

				
				return new TimelineMax( { tweens: [

					new TimelineMax( { tweens: [
	
						new TimelineMax( { tweens: [

							TweenMax.to( $refs.openLineTop1, .6, { bezier: { values:[ { height: 32, y: 0 }, { height: 0, y: -37 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
							TweenMax.to( $refs.openLineTop2, .6, { bezier: { values:[ { height: 0, y: 12 }, { height: 12, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

							], stagger: .06 } ),

						new TimelineMax( { tweens: [

							TweenMax.to( $refs.openLineBot1, .6, { bezier: { values:[ { height: 32, y: 0 }, { height: 0, y: -37 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
							TweenMax.to( $refs.openLineBot2, .6, { bezier: { values:[ { height: 0, y: 12 }, { height: 32, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )
						
							], stagger: .06 } )

						], stagger: .09 } )

					//TweenMax.to( $holder, .6, { y: -34, force3D: true, ease: Cubic.easeOut } )
					
					] } )
			},

			openMouseleave ( event ) {

				if ( this.isOpen || this.mobile ) return


				let $refs = this.$refs,

					$target = $refs.open,

					$holder = $target.querySelector( '.holder' )


				return new TimelineMax( { tweens: [

					new TimelineMax( { tweens: [
	
						new TimelineMax( { tweens: [

							TweenMax.to( $refs.openLineTop2, .6, { bezier: { values:[ { height: 0, y: 12 }, { height: 0, y: 12 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } ),
							TweenMax.to( $refs.openLineTop1, .6, { bezier: { values:[ { height: 32, y: 0 }, { height: 12, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } )

							], stagger: .06 } ),

						new TimelineMax( { tweens: [

							TweenMax.to( $refs.openLineBot2, .6, { bezier: { values:[ { height: 0, y: 12 }, { height: 0, y: 12	 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } ),
							TweenMax.to( $refs.openLineBot1, .6, { bezier: { values:[ { height: 32, y: 0 }, { height: 32, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } )

							], stagger: .06 } )
						
						], stagger: .09 } )

					//TweenMax.to( $holder, .6, { y: 0, force3D: true, ease: Cubic.easeInOut } )

					] } )
			},

			closeMouseenter ( event ) {

				if ( !this.isOpen || this.mobile ) return


				this.$mixer.play( 'tic' )


				let $refs = this.$refs,

					$target = $refs.close,

					$holder = $target.querySelector( '.holder' )


				return new TimelineMax( { tweens: [

					new TimelineMax( { tweens: [
	
						new TimelineMax( { tweens: [

							TweenMax.to( $refs.closeLineBot1, .5, { bezier: { values:[ { scaleY: 1.25, y: -25 }, { scaleY: 0, y: -25 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
							TweenMax.to( $refs.closeLineBot2, .5, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 1, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

							], stagger: .05 } ),

						new TimelineMax( { tweens: [

							TweenMax.to( $refs.closeLineTop1, .5, { bezier: { values:[ { scaleY: 1.25, y: -25 }, { scaleY: 0, y: -25 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),
							TweenMax.to( $refs.closeLineTop2, .5, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 1, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

							], stagger: .05 } )
						
						], stagger: .05 } )

					//TweenMax.to( $holder, .6, { y: -34, force3D: true, ease: Cubic.easeInOut } )
					
					] } )
			},

			closeMouseleave ( event ) {

				if ( !this.isOpen || this.mobile ) return


				let $refs = this.$refs,

					$target = $refs.close,

					$holder = $target.querySelector( '.holder' )


				return new TimelineMax( { tweens: [

					new TimelineMax( { tweens: [

						new TimelineMax( { tweens: [

							TweenMax.to( $refs.closeLineTop1, .5, { bezier: { values:[ { scaleY: 1.25, y: -25 }, { scaleY: 1, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } ),
							TweenMax.to( $refs.closeLineTop2, .5, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 0, y: 25 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } )

							], stagger: .05 } ),

						new TimelineMax( { tweens: [

							TweenMax.to( $refs.closeLineBot1, .5, { bezier: { values:[ { scaleY: 1.25, y: -25 }, { scaleY: 1, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } ),
							TweenMax.to( $refs.closeLineBot2, .5, { bezier: { values:[ { scaleY: 1.25, y: 25 }, { scaleY: 0, y: 25 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut } )

							], stagger: .05 } )

						], stagger: .05 } )
					
					//TweenMax.to( $holder, .6, { y: 0, force3D: true, ease: Cubic.easeInOut } )
					
					] } )
			},

			enter () {

				let $refs = this.$refs

				return new TimelineMax( { tweens: [

					TweenMax.from( $refs.openLabel, 1.5, { y: 34, force3D: true, ease: Cubic.easeInOut } ),

					new TimelineMax( { tweens: [

						TweenMax.fromTo( $refs.openLineTop1, 1.2, { height: 0, y: 24 }, { bezier: { values:[ { height: 20, y: 12 }, { height: 12, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } ),

						TweenMax.fromTo( $refs.openLineBot1, 1.2, { height: 0, y: 24 }, { bezier: { values:[ { height: 40, y: 12 }, { height: 32, y: 0 } ], curviness: 0 }, force3D: true, ease: Cubic.easeOut } )

						], stagger: .15 } )

					], stagger: .5 } )
			}
		},

		created () {

			this.$bus.on( Actions.CLOSE_MENU, this.close )
		}
	}
</script>

<style lang="scss">
	
	#hamb {

		position: absolute;

		top: 50%; left: 45px;

		z-index: 15;

		@media ( max-width: map-get( $sizes, custom ) - 1 ) {

			left: 25px; bottom: 115px; top: auto;
		}

		.label {

			position: absolute;

			overflow: hidden;

			color: map-get( $colors, white );
			
			letter-spacing: map-get( $ls, s );

			@include rotate( -90deg );

			cursor: pointer;

			font: {

				size: map-get( $typo, p_ );
			}

			text: {

				transform: uppercase;
			}

			@include transition( color .8s map-get( $ease, cubic_out ) );

			>span {
	
				position: relative;

				display: block;

				.holder {

					position: relative;

					display: block;

					span {

						display: block;
						
						padding: 10px;

						&.open, &.close {

							position: absolute;

							top: 100%; left: 0;
						}
					}
				}
			}
		}

		.icon {

			position: absolute;
			
			cursor: pointer;

			background-color: rgba(0,0,0,0);

			.line-top {
				
				position: absolute;

				.line-1, .line-2 {
					
					position: absolute;

					>span {

						position: absolute;
						
						top: 0; left: 0; 

						width: 100%; height: 100%;

						background: {

							color: map-get( $colors, white );
						}

						@include transition( background-color .8s map-get( $ease, cubic_out ) );
					}
				}
			}

			.line-bot {
				
				position: absolute;

				.line-1, .line-2 {
					
					position: absolute;

					>span {

						position: absolute;
						
						top: 0; left: 0; 

						width: 100%; height: 100%;

						background: {

							color: map-get( $colors, white );
						}

						@include transition( background-color .8s map-get( $ease, cubic_out ) );
					}
				}
			}
		}
		
		.open {
			
			position: absolute;

			top: 0; left: 0;

			.icon {

				top: -21px; left: -11px;

				width: 22px; height: 42px;

				.line-top {
					
					width: 2px; height: 32px;

					bottom: 5px; left: 5px;

					.line-1 {

						left: 0; right: 0; bottom: 0; height: 12px;
					}

					.line-2 {

						left: 0; right: 0; bottom: 0; height: 0px;
						
						@include translate( 0, 12px );
					}
				}

				.line-bot {
					
					width: 2px; height: 32px;

					bottom: 5px; right: 5px;

					.line-1 {

						left: 0; right: 0; bottom: 0; height: 32px;
					}

					.line-2 {

						left: 0; right: 0; bottom: 0; height: 0px;
						
						@include translate( 0, 12px );
					}
				}
			}
			
			.label {

				top: 55px; left: -24px;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					top: 35px;
				}
			}
		}

		.close {
			
			position: absolute;

			top: 0; left: 0;

			.icon {

				top: -21px; left: -21px;

				width: 42px; height: 42px;

				visibility: hidden;

				opacity: 0;

				.line-top {
					
					width: 2px; height: 34px;
					
					top: 4px; right: 20px;

					overflow: hidden;

					@include rotate( 45deg );

					.line-1, .line-2 {

					    top: 10px; left: 0; right: 0; bottom: 10px;
					}

					.line-2 {

				    	@include translate( 0, 25px );
					}
				}

				.line-bot {
					
					width: 2px; height: 34px; 

			    	bottom: 4px; left: 20px;

			    	overflow: hidden;

			    	@include rotate( -45deg );

			    	.line-1, .line-2 {

					    top: 10px; left: 0; right: 0; bottom: 10px;
					}

					.line-2 {

				    	@include translate( 0, 25px );
					}
				}
			}
			
			.label {

				top: -90px; left: -28px;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					top: -70px;
				}

				>span {
					
					@include translate( -140%, 0 );
				}
			}
		}

		.light & {
			
			.icon {
				
				.line-top {

					.line-1, .line-2 {

						>span {
							
							background: {

								color: map-get( $colors, gray );
							}
						}
					}
				}

				.line-bot {
					
					.line-1, .line-2 {
						
						>span {

							background: {

								color: map-get( $colors, gray );
							}
						}
					}
				}
			}

			.label {

				color: map-get( $colors, gray );
			}
		}
	}

</style>