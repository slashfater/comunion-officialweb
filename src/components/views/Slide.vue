
<template>
	
	<!--transition name="slide"-->
		
	<transition
			appear
			name="slide"
			mode="out-in"
			@afterEnter="enter"
    	@leave="leave"
    	:css="false">

		<section :key="name" :id="name" class="slide">
				
			<div class="table">
				<div class="table-cell">
					
					<h3 v-if="head && !news">
						<span class="font-reg">
							<span class="letter" v-for="(letter, i) in head" :class="{ 'space': letter == ' ' }" :key="i" ref="h3Letters">{{ letter }}</span>
						</span>
					</h3>
					
					<h1 v-if="title || news" :class="{ 'main': index == 0, 'news': news }">
						<span class="font-reg" v-if="!news" key="tn-1">
							<span class="left line" ref="h1LeftLine"></span>
							<span class="letter" v-for="(letter, i) in title" :class="{ 'space': letter == ' ' }" :key="i+100" ref="h1Letters">{{ letter }}</span>
							<span class="right line" ref="h1RightLine"></span>
						</span>

						<span class="font-reg" v-if="news" key="tn-1">
							<span class="left line" ref="h1LeftLine"></span>
							<span class="letter" v-for="(letter, i) in newsTitle" :key="i+1000" :class="{ 'space': letter == ' ' }" ref="h1Letters">{{ letter }}</span>
							<span class="right line" ref="h1RightLine"></span>
						</span>
					</h1>

					<h4 v-if="copy || mcopy || news">
						<span class="font-reg" :class="{ 'show': deskscreen }" v-if="!news" key="mc-1">
							<span class="row" v-for="( row, i ) in copy.split('<br />')" :key="i+1100" ref="h4Rows"><span>{{ row }}</span></span>
						</span>

						<span class="font-reg" :class="{ 'show': !deskscreen }" v-if="!news" key="mc-2">
							<span class="row" v-for="( row, i ) in mcopy.split('<br />')" :key="i+1200" ref="mh4Rows"><span>{{ row }}</span></span>
						</span>

						<span class="font-reg" :class="{ 'show': deskscreen }" v-if="news" key="mc-3">
							<span class="row" v-for="( row, i ) in newsCopy.split('<br />')" :key="i+1300" ref="h4Rows"><span>{{ row }}</span></span>
						</span>

						<span class="font-reg" :class="{ 'show': !deskscreen }" v-if="news" key="mc-4">
							<span class="row" v-for="( row, i ) in newsMCopy.split('<br />')" :key="i+1400" ref="mh4Rows"><span>{{ row }}</span></span>
						</span>
					</h4>

					<simple-btn class="red" :click="newslink" v-if="news" ref="newsBtn">
						<span class="font-reg">{{ newsCta }}</span>
					</simple-btn>

					<main-btn class="red" :click="discover" v-if="cta" ref="mainBtn">
						<span class="font-reg">{{ cta }}</span>
					</main-btn>

				</div>
			</div>

		</section>

	</transition>

</template>

<script>
	
	import { mapState } from 'vuex'

	import { States, Sizes, Events } from '../../constants'

	import Section from '../mixins/Section'
	
	import Commons from '../mixins/Commons'

	import MainBtn from '../btns/MainBtn.vue'

	import SimpleBtn from '../btns/SimpleBtn.vue'

	import meta from '../../meta'

	export default {

		name: 'Slide',

		mixins: [ Section, Commons ],

		data () {
	
			return {

				deskscreen: true
			}
		},

		components: {

			'main-btn': MainBtn,

			'simple-btn': SimpleBtn
		},

		computed: {

			...mapState( {

				slider: state => state.site.collections.slider,

				locale: state => state.site.locale
			} ),

			// counter () { return this.locale.counter },

			name () { return this.$route.params.slide },

			index () { return this.slider.indexOfName( this.name ) },

			title () { return this.locale.home[ this.index ].title || null },

			head () { return this.locale.home[ this.index ].head || null },

			cta () { return this.locale.home[ this.index ].cta || null },

			copy () { return this.locale.home[ this.index ].copy || null },
			
			mcopy () { return this.locale.home[ this.index ].mcopy || null },

			newsTitle () { return this.news ? this.locale.news.title : null },

			newsCopy () { return this.news ? this.locale.news.copy : null },
			
			newsMCopy () { return this.news ? this.locale.news.mcopy : null },

			newsCta () { return this.news ? this.locale.news.cta : null },

			news () { return this.locale.news.length === undefined && this.index == 0 }
		},

		methods: {

			discover () {

				let leaf = 'the-gate' // => dynamic value ??

				this.navigateTo( States.LEAF, { leaf } )
			},

			newslink () {

				window.open( this.locale.news.link, '_blank' )
			},

			leave ( el, done ) {
				console.log('=====')

				let $refs = this.$refs,

					$mainBtn = $refs.mainBtn ? $refs.mainBtn.$refs.wrap : { y: 0 },

					$newsBtn = $refs.newsBtn ? $refs.newsBtn.$refs.wrap : { y: 0 },
					
					delay = meta.scrollontop ? 0 : 2


				return new TimelineMax( { tweens: [

					TweenMax.to( $newsBtn, 1, { y: 55, force3D: true, ease: Cubic.easeInOut } ),
					
					TweenMax.to( $mainBtn, 1, { y: 75, force3D: true, ease: Cubic.easeInOut } ),

					TweenMax.allTo( $refs.h3Letters, .8, { y: 25, force3D: true, ease: Cubic.easeInOut }, .02 ),

					new TimelineMax( { tweens: [

						TweenMax.to( $refs.h1LeftLine, .8, { x: -40, scaleX: 0, force3D: true, ease: Cubic.easeInOut } ),

						TweenMax.to( $refs.h1RightLine, .8, { x: 40, scaleX: 0, force3D: true, ease: Cubic.easeInOut } )
					
						] } ),

					new TimelineMax( { tweens: [

						TweenMax.allTo( $refs.mh4Rows, 1, { width: 0, force3D: true, ease: Cubic.easeInOut }, .05 ),

						TweenMax.allTo( $refs.h4Rows, 1, { width: 0, force3D: true, ease: Cubic.easeInOut }, .05 ),

						TweenMax.allTo( $refs.h1Letters, 1, { y: 75, force3D: true, ease: Cubic.easeInOut }, .05 )

						] } )

					], delay, onComplete: () => {

						if ( done instanceof Function )

							done()
					} } )
			},

			enter ( el, done ) {
				console.log('ssss')
				let $refs = this.$refs,

					$mainBtn = $refs.mainBtn ? $refs.mainBtn.$refs.wrap : { y: 0 },

					$newsBtn = $refs.newsBtn ? $refs.newsBtn.$refs.wrap : { y: 0 },

					delay = meta.scrollontop ? .75 : 2.75


				return new TimelineMax( { tweens: [

					new TimelineMax( { tweens: [
						
						TweenMax.allFrom( $refs.h1Letters, 1, { y: 75, force3D: true, ease: Cubic.easeOut }, .05 ),

						TweenMax.allFrom( $refs.h4Rows, 1, { width: 0, force3D: true, ease: Cubic.easeInOut, onComplete: function () {

							TweenMax.set( this.target, { width: 'auto' } )

							} }, .05 ),

						TweenMax.allFrom( $refs.mh4Rows, 1, { width: 0, force3D: true, ease: Cubic.easeInOut, onComplete: function () {

							TweenMax.set( this.target, { width: 'auto' } )

							} }, .05 )
						
						] } ),

					new TimelineMax( { tweens: [

						TweenMax.from( $refs.h1LeftLine, .8, { scaleX: 0, ease: Cubic.easeOut } ),

						TweenMax.from( $refs.h1RightLine, .8, { scaleX: 0, ease: Cubic.easeOut } )

						] } ),

					TweenMax.allFrom( $refs.h3Letters, .8, { y: 25, force3D: true, ease: Cubic.easeInOut }, .04 ),

					TweenMax.from( $mainBtn, 1, { y: 75, force3D: true, ease: Cubic.easeInOut } ),
					
					TweenMax.from( $newsBtn, 1, { y: 55, force3D: true, ease: Cubic.easeInOut } )

					], delay, onComplete: () => {

						if ( done instanceof Function )

							done()
					} } )
			},

			resize () {

				let deskscreen = window.innerWidth > Sizes.CUSTOM - 1

				if ( !deskscreen && this.deskscreen ) {

					this.deskscreen = false

				} else if ( deskscreen && !this.deskscreen ) {

					this.deskscreen = true
				}
			}
		},

		mounted () {

			this.$resizer.bus.on( Events.RESIZE, this.resize )

			this.resize()
		},

		destroyed () {

			this.$resizer.bus.off( Events.RESIZE, this.resize )
		}
	}
</script>

<style lang="scss">

	section.slide {

		//display: none;

		position: absolute;

		top: 0; left: 0; bottom: 0; right: 0;

		z-index: 1;

		@include grabbable();

		&:active {
			
			@include grabbable-active();
		}

		.table {

			width: 100%; height: 100%;
		}

		h1 {

			margin: 5px 0 10px 0;

			&.main {

				letter-spacing: map-get( $ls, xs );

				font: {

					size: 55px;
				}
			}

			&.news {

				font: {

					size: 24px;
				}
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {
				
				&.main {

					font: {

						size: 55px * 0.7;
					}
				}

				&.news {
						
					font: {

						size: 24px * 0.7;
					}
				}
			}

			.line {

				position: absolute;

				width: 40px; height: 2px; top: 50%;

				background: {

					color: map-get( $colors, rgb_xlight_white );
				}
				
				@media ( max-width: map-get( $sizes, custom ) - 1 ) {
	
					display: none;
				}

				&.left {

					@include transform-origin( 100% 0% );
	
					margin: -1px 0 0 -40px;

					left: -40px;
				}

				&.right {

					@include transform-origin( 0% 0% );
					
					margin: -1px -40px 0 0;

					right: -40px;
				}
			}

			>span { 
				
				&:before, &:after {

					//content: '';

					position: absolute;

					width: 40px; height: 2px; top: 50%;

					background: {

						color: map-get( $colors, rgb_xlight_white );
					}
				}

				&:before {

					margin: -1px 0 0 -40px;

					left: -40px;
				}

				&:after {

					margin: -1px -40px 0 0;

					right: -40px;
				}
			}
		}

		h3 {

			margin: 15px auto 0px;

			color: map-get( $colors, red );

			text: {

				transform: uppercase;

				align: center;
			}
		}

		h4 {

		    max-width: 580px;
		
			margin: 0 auto 10px;

			line-height: 1.75em;

			letter-spacing: map-get( $ls, xs ) * 1.5;

			text: {

				transform: uppercase;

				align: center;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

			    font-size: map-get( $typo, s_ );

				max-width: 320px;
			}

			>span {

				position: relative;

				display: none;

				&.show {

					display: block;
				}

				span.row {

					position: relative;

					overflow: hidden;

					display: block;

					width: 100%;

					clear: both;
					
					span {

						position: relative;

						display: block;

						width: 580px;

						@media ( max-width: map-get( $sizes, custom ) - 1 ) {

							width: 320px;
						}
					}

					&:nth-child(even) {
						
						float: right;

						span {
							
							float: right;
						}
					}
					
					&:nth-child(odd) {
					
						float: left;

						span {
							
							float: left;
						}
					}	
				}
			}
		}

		$h1duration: 1s;
		
		$h3duration: 0.9s;
		
		$h4duration: 1.4s;

		$ctaduration: 1.2s;

		$totduration: 2.75s;

		
		$h1stagger: 0.08s;
		
		$h3stagger: 0.045s;
		
		$h4stagger: 0.16s;

		$ctastagger: 0.35s;


		$delay1: 0.9s;

		$delay2: 0.9s;

		
		$easingOut: map-get( $ease, cubic_out );
		
		$easingInOut: map-get( $ease, cubic_in_out );
		

		&.slide-enter-active, &.slide-leave-active {
			
			@include transition( $totduration );

			h1 span.letter { @include transition( transform $h1duration $easingOut ); }

			h3 span.letter { @include transition( transform $h3duration $easingOut ); }

			button.main-btn .wrap { @include transition( transform $ctaduration $easingOut ); }

			h4 span.row { @include transition( width $h4duration $easingOut ); }

			h1>span:before, h1>span:after { @include transition( transform $h3duration $easingOut ); }
		}

		&.slide-leave-active {

			h1 span.letter { @for $i from 1 to 15 { &:nth-child(#{$i}) { @include transition-delay( $i * $h1stagger ); @include transition-timing-function( $easingInOut ) } } }

			h3 span.letter { @for $i from 1 to 30 { &:nth-child(#{$i}) { @include transition-delay( $i * $h3stagger ); } } }

			h4 span.row { @for $i from 1 to 10 { &:nth-child(#{$i}) { @include transition-delay( $i * $h4stagger ); } } }

			h1>span:before { @include transform-origin( 0% 0% ); @include transition-delay( $ctastagger ); }
			
			h1>span:after { @include transform-origin( 100% 0% ); @include transition-delay( $ctastagger ); }

			button.main-btn .wrap { @include transition-delay( $ctastagger ); }
		}

		&.slide-enter-active {

			h1 span.letter { @for $i from 1 to 15 { &:nth-child(#{$i}) { @include transition-delay( $delay1 + $i * $h1stagger ); } } }

			h3 span.letter { @for $i from 1 to 30 { &:nth-child(#{$i}) { @include transition-delay( $delay1 + $i * $h3stagger ); } } }

			h4 span.row { @for $i from 1 to 10 { &:nth-child(#{$i}) { @include transition-delay( $delay2 + $i * $h4stagger ); } } }

			h1>span:before { @include transform-origin( 100% 0% ); @include transition-delay( $delay2 + $ctastagger ); }

			h1>span:after { @include transform-origin( 0% 0% ); @include transition-delay( $delay2 + $ctastagger ); }

			button.main-btn .wrap { @include transition-delay( $delay2 + $ctastagger ); }
		}

		&.slide-enter, &.slide-leave-active {

			h1 span.letter {

				@include translate3d( 0, 75px, 0 );
			}
			
			h3 span.letter {

				@include translate3d( 0, 20px, 0 );
			}

			button.main-btn .wrap {

				@include translate3d( 0, 75px, 0 );	
			}

			h1>span:before, h1>span:after {

				@include scale( 0, 1 );	
			}

			h4 span.row {

				width: 0%;
			}
		}
	}

</style>