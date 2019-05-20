
<template>

	<div id="slider-nav">

		<div class="table">
			<div class="table-cell">
				
				<ul :class="{ 'down': dir > 0, 'up': dir < 0 }">
					<li v-for="(slide,i) in slider" @click.prevent="goTo( slide.name )" >
						<a :href="slide.path"></a>

						<transition name="cursor">
							
							<span class="cursor"  v-if="i == index"></span>
						
						</transition>
					</li>

					<!--span id="cursor" :style="{ top: offset }"><span></span></span-->
				</ul>

			</div>
		</div>

	</div>

</template>

<script>

	import { mapState } from 'vuex'
	
	import { Actions, States } from '../../constants'

	import Commons from '../mixins/Commons'

	export default {

		name: 'SliderNav',

		mixins: [ Commons ],

		data () {
	
			return {

				dir: 0
			}
		},

		computed: {

			...mapState( {

				slider: state => state.site.collections.slider
			} ),

			slide () { return this.$route.params.slide },

			index () { return this.slider.indexOfName( this.slide ) }
		},

		watch: {

			$route: function ( to, from ) {

				let toIndex = this.slider.indexOfName( to.params.slide ),

					fromIndex = this.slider.indexOfName( from.params.slide ),

					dir = toIndex - fromIndex < 0 ? -1 : 1

				this.dir = dir
			}
		},

		methods: {

			goTo ( name ) {

				this.navigateTo( States.SLIDER, { slide: name } )
			},

			leave ( el, done ) {
				
				let $refs = this.$refs

				return new TimelineMax( { tweens: [

					TweenMax.to( this.$el, 1, { autoAlpha: 0, ease: Cubic.easeInOut } )

					] } )
			},

			enter ( el, done ) {

				let $refs = this.$refs

				return new TimelineMax( { tweens: [

					TweenMax.from( this.$el, 1, { autoAlpha: 0, ease: Cubic.easeInOut } )
					
					] } )
			}
		}
	}
</script>

<style lang="scss">
	
	#slider-nav {

		position: absolute;

		width: 2px;

		top: 0; bottom: 0; right: 90px;

		z-index: 2;

		@media ( max-width: map-get( $sizes, custom ) - 1 ) {

			right: 1px;
		}

		.table {

			position: relative;

			width: 100%; height: 100%;
		}

		#cursor {
	
			position: absolute;

			top: 0; left: 8px;

			width: 4px; height: 50px;

			z-index: 1;

			span {

				position: absolute;

				top: 5px; left: 0; right: 0; bottom: 5px;

				opacity: 0.9;

				background: {

					color: map-get( $colors, red );
				}
			}
		}
		
		ul {

			position: relative;

		    margin: 0 0 0 -9px;

			li {
				
				position: relative;

				display: block;

				width: 100%; height: 50px;

				padding: 0 10px;

				cursor: pointer;

				a {

					position: absolute;

					top: 5px; left: 9px; right: 9px; bottom: 5px;

					background: {

						color: map-get( $colors, rgb_xlight_white );
					}
				}

				.cursor {

					position: absolute;	

					top: 5px; left: 8px; right: 8px; bottom: 5px;
					
					background: {

						color: map-get( $colors, red );
					}

					$duration: 1s;

					$easing: map-get( $ease, cubic_in_out );
					
					&.cursor-enter-active, &.cursor-leave-active {
						
						@include transition( transform $duration $easing );
					}

					&.cursor-leave-active {
						
						@include transition-delay( 0s );
					}

					&.cursor-enter-active {
	
						@include transition-delay( 0.45s );
					}

					&.cursor-enter, &.cursor-leave-active {
					
						@include scale( 1, 0 );	
					}
				}

				&:hover {

					a {

						left: 9px; right: 9px;
					}
				}
			}

			&.down {
				
				li .cursor {

					&.cursor-leave-active { @include transform-origin( 0% 100% ); }

					&.cursor-enter-active { @include transform-origin( 0% 0% ); }
				}
			}

			&.up {
				
				li .cursor {

					&.cursor-leave-active { @include transform-origin( 0% 0% ); }

					&.cursor-enter-active { @include transform-origin( 0% 100% ); }
				}
			}
		}	
	}

</style>