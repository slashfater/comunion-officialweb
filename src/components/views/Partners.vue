 
<template>
	
	<transition 

    	@enter="enter" 
    	
    	@leave="leave"

    	:css="false">

		<section id="partners" class="root">

			<div class="left side" ref="leftSide">

				<div class="holder" ref="leftSideHold">

					<div class="table">
						<div class="table-cell">

							<div class="main row">
								<h2>
									<span class="font-reg">
										<span class="letter" v-for="letter in 'Partners'" :class="{ 'space': letter == ' ' }" ref="leftSideLetters">{{ letter }}</span>
									</span>
								</h2>
								<span class="line" ref="leftSideLine"></span>
								<p ref="leftSideCopy"><span class="font-reg" v-html="locale.partners.copy"></span></p>
							</div>

						</div>
					</div>

				</div>

			</div>

			<div class="right side" ref="rightSide">

				<div class="holder" ref="rightSideHold">

					<scroller ref="scroller">

						<div class="side" ref="mainrow">

							<div class="table">
								<div class="table-cell">

									<div class="main row">
										<h2>
											<span class="font-reg">
												<span class="letter" v-for="letter in 'Partners'" :class="{ 'space': letter == ' ' }" ref="rightSideLetters">{{ letter }}</span>
											</span>
										</h2>
										<span class="line" ref="rightSideLine"></span>
										<p ref="rightSideCopy"><span class="font-reg" v-html="locale.partners.copy"></span></p>
									</div>

								</div>
							</div>
							
							<span class="v-line"></span>

						</div>

						<ul>
							<li v-for="model in collection" ref="rightSideList">
								<div class="partner">
									<div class="head">
										<span class="left line"></span>
										<span class="logo">
											<img :src="model.logo" alt="">
										</span>
										<span class="right line"></span>
									</div>
									<div class="body">
										<span class="picture" v-if="model.image">
											<img :src="model.image" alt="">
										</span>
										<p><span class="font-reg" v-html="model.desc"></span></p>
									</div>
								</div>
							</li>
						</ul>

					</scroller>

				</div>

			</div>
			
		</section>

	</transition>

</template>

<script>

	import { mapState } from 'vuex'

	import { Events, Sizes } from '../../constants'

	import Section from '../mixins/Section'

	import Scroller from '../include/Scroller.vue'

	import meta from '../../meta'
	
	export default {

		name: 'Partners',

		mixins: [ Section ],

		data () {

			return {

				ontop: true
			}	
		},

		computed: {

			...mapState( {

				locale: state => state.site.locale,

				collection: state => state.site.partners
			} )
		},

		components: {

			'scroller': Scroller
		},
		
		methods: {

			initialize () {

				this.resize()

				this.preload()
			},

			preload () {

				let manifest = [],

					loader = new createjs.LoadQueue( true )

				for ( let model of this.collection ) {

					let logo = model.logo,

						image = model.image

					if ( logo )

						manifest.push( { src: logo } )

					if ( image )

						manifest.push( { src: image } )
				}

				loader.on( 'complete', event => {

					this.resize()
				} )
				
				loader.loadManifest( manifest )
			},

			render () {

				let $refs = this.$refs,
					
					scroller = $refs.scroller,

					scrollTop = scroller ? scroller.top() : 0,

					absScrollTop = Math.abs( scrollTop )


				if ( absScrollTop > 0 && this.ontop ) {

					this.$bus.emit( Events.UISTATE, { visible: false } )
				
					this.ontop = false

				} else if ( absScrollTop == 0 && !this.ontop ) {

					this.$bus.emit( Events.UISTATE, { visible: true } )
					
					this.ontop = true
				}
			},

			leave ( el, done ) {

				let $refs = this.$refs,

					scroller = $refs.scroller,

					delay = meta.scrollontop ? 0 : 2,

					offset = window.innerHeight,

					deskscreen = window.innerWidth > Sizes.CUSTOM - 1,

					$scrollbar = scroller.$el.querySelector( '.iScrollIndicator' )

				
				return deskscreen

					? new TimelineMax( { tweens: [

						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),
						
						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),
						
						new TimelineMax( { tweens: [
							
							TweenMax.to( $refs.leftSide, 1, { y:-offset, force3D: true, ease: Cubic.easeInOut } ),
							
							TweenMax.to( $refs.leftSideHold, 1, { y: offset * .5, force3D: true, ease: Cubic.easeInOut } )
							
							] } ),

						new TimelineMax( { tweens: [
							
							TweenMax.to( $refs.rightSide, 1, { y:-offset, force3D: true, ease: Cubic.easeInOut } ),
							
							TweenMax.to( $refs.rightSideHold, 1, { y: offset * .5, force3D: true, ease: Cubic.easeInOut } )
							
							] } ),

						TweenMax.to( $scrollbar || { scaleY: 1 }, 1, { scaleY: 0, ease: Cubic.easeInOut } )
						
						], stagger: .12, delay, onComplete: done } )

					
					:new TimelineMax( { tweens: [

						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),
						
						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),

						new TimelineMax( { tweens: [
							
							TweenMax.to( $refs.rightSide, 1, { y:-offset, force3D: true, ease: Cubic.easeInOut } ),
							
							TweenMax.to( $refs.rightSideHold, 1, { y: offset * .5, force3D: true, ease: Cubic.easeInOut } )
							
							] } )

						], stagger: .12, delay, onComplete: done } )
			},

			enter ( el, done ) {

				let $refs = this.$refs,

					scroller = $refs.scroller,

					delay = meta.scrollontop ? 0 : 2,

					offset = window.innerHeight,

					deskscreen = window.innerWidth > Sizes.CUSTOM - 1,

					$scrollbar = scroller.$el.querySelector( '.iScrollIndicator' )


				return deskscreen

					? new TimelineMax( { tweens: [

						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),
						
						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),
						
						new TimelineMax( { tweens: [
							
							TweenMax.from( $refs.leftSide, 1, { y: offset, force3D: true, ease: Cubic.easeInOut } ),
							
							TweenMax.from( $refs.leftSideHold, 1, { y:-offset, force3D: true, ease: Cubic.easeInOut } ),
							
							new TimelineMax( { tweens: [

								TweenMax.allFrom( $refs.leftSideLetters, 1.2, { y: offset * .25, force3D: true, ease: Cubic.easeOut } ),
								
								TweenMax.from( $refs.leftSideLine, 1.2, { y: offset * .25, force3D: true, ease: Cubic.easeOut } ),
								
								TweenMax.from( $refs.leftSideCopy, 1.2, { y: offset * .25, force3D: true, ease: Cubic.easeOut } )

								], stagger: .1 } )
							
							] } ),

						new TimelineMax( { tweens: [
							
							TweenMax.from( $refs.rightSide, 1, { y: offset, force3D: true, ease: Cubic.easeInOut } ),
							
							TweenMax.from( $refs.rightSideHold, 1, { y:-offset, force3D: true, ease: Cubic.easeInOut } ),
							
							TweenMax.allFrom( $refs.rightSideList, 1.2, { y: offset * .25, force3D: true, ease: Cubic.easeOut }, .1 )
							
							] } ),

						TweenMax.from( $scrollbar || { scaleY: 1 }, 1, { scaleY: 0, ease: Cubic.easeInOut } )
						
						], stagger: .12, delay, onComplete: done } )

					
					: new TimelineMax( { tweens: [

						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),
						
						new TimelineMax( { tweens: [ TweenMax.to( { value: 0 }, 1, { value: 1, ease: Cubic.easeInOut } ) ] } ),

						new TimelineMax( { tweens: [
							
							TweenMax.from( $refs.rightSide, 1, { y: offset, force3D: true, ease: Cubic.easeInOut } ),
							
							TweenMax.from( $refs.rightSideHold, 1, { y:-offset, force3D: true, ease: Cubic.easeInOut } ),
							
							new TimelineMax( { tweens: [

								TweenMax.allFrom( $refs.rightSideLetters, 1.2, { y: offset * .25, force3D: true, ease: Cubic.easeOut } ),
								
								TweenMax.from( $refs.rightSideLine, 1.2, { y: offset * .25, force3D: true, ease: Cubic.easeOut } ),
								
								TweenMax.from( $refs.rightSideCopy, 1.2, { y: offset * .25, force3D: true, ease: Cubic.easeOut } )

								], stagger: .1 } )

							] } )

						], stagger: .12, delay, onComplete: done } )
			},

			resize () {

				let $refs = this.$refs,

					mainrow = $refs.mainrow,

					scroller = $refs.scroller


				if ( mainrow )
					
					TweenMax.set( mainrow, { height: window.innerHeight } )

				if ( scroller ) 

					scroller.resize()

			}	
		},

		mounted () {

			this.$resizer.bus.on( Events.RESIZE, this.resize )

			this.$ticker.add( this.render )

			this.initialize()
		},

		destroyed () { 

			this.$ticker.remove( this.render )

			this.$resizer.bus.off( Events.RESIZE, this.resize )
		}
	}
</script>

<style lang="scss">

	section.root {

		&#partners {

			color: map-get( $colors, white );

			ul {

				list-style: none;

				position: relative;

				padding-top: 70px;

				li {

					position: relative;

					.partner {

						position: relative;

						padding-top: 40px;

						@media ( max-width: map-get( $sizes, custom ) - 1 ) {

							padding-top: 25px;
						}

						.head {
							
							position: relative;

							.logo {
								
								display: block;
   								
   								width: 190px;

							    margin-left: 20px;

							    @media ( max-width: map-get( $sizes, custom ) - 1 ) {

   									width: 120px;
							    }
								
								img {
										
									width: auto; height: 50px;

									margin: 0 auto;

									display: block;

									@media ( max-width: map-get( $sizes, custom ) - 1 ) {

										height: 35px;
									}
								}
							}

							.line {

								position: absolute;
								
								top: 50%; height: 2px;

								margin-top: -1px;

								background: {

									color: rgba(255,255,255,.3);
								}

								&.left {
									
									left: 0; width: 20px;
								}

								&.right {

									right: 0; left: ( 190px + 20px );

									@media ( max-width: map-get( $sizes, custom ) - 1 ) {
										
										right: 0; left: ( 120px + 20px );
									}
								}
							}
						}

						.body {

							.picture {

								padding-top: 40px;

								display: block;

								@media ( max-width: map-get( $sizes, custom ) - 1 ) {

									padding-top: 25px;
								}
								
								img {
									
									display: block;

									width: 100%;

							    	border: 5px solid map-get( $colors, white );
								}
							}

							p {
								padding-top: 40px;
								
							    text: {

									transform: uppercase;

									align: justify;
								}

								@media ( max-width: map-get( $sizes, custom ) - 1 ) {

									padding-top: 25px;
								}
							}
						}
					}
				}
			}

			.scroller {

				right: 87px;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) { 
				
					right: 0;
				}

				.scroller-body {
				
					padding: 0 60px 100px;

					margin-right: 3px;

					@media ( max-width: map-get( $sizes, custom ) - 1 ) { 
				
						padding: 0 50px 100px;

						margin-right: 0;
					}
				}

				.iScrollVerticalScrollbar {

					top: 4px; bottom: 4px;

					width: 2px;
					
					.iScrollIndicator {

						background: {

							color: map-get( $colors, white );
						}
					}
				}
			}
		}
	}

</style>