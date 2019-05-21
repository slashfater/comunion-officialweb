
<template>

	<section id="leaf-nav">

		<div class="next btn" :name="'next'" :class="{ 'active': nextActive }" @click="next" @mouseenter="mouseenter" @mouseleave="mouseleave">
			<div class="btn-side sx">
				<div class="btn-wrap" ref="nextSx">
					<span class="red-bg"></span>
					<span class="counts">
						<span class="count">
							<span class="font-bold">{{ nextCount }}</span>
						</span>
						<span class="count">
							<span class="font-bold">{{ nextCount }}</span>
						</span>
					</span>
				</div>
			</div>
			<div class="btn-side dx">
				<div class="btn-wrap" ref="nextDx">
					<span class="red-bg"></span>
					<span class="arrows">
						<span class="red arrow"></span>
						<span class="white arrow"></span>
					</span>
				</div>
			</div>
		</div>

		<div class="prev btn" :name="'prev'" :class="{ 'active': prevActive }" @click="prev" @mouseenter="mouseenter" @mouseleave="mouseleave">
			<div class="btn-side sx">
				<div class="btn-wrap" ref="prevSx">
					<span class="red-bg"></span>
					<span class="arrows">
						<span class="red arrow"></span>
						<span class="white arrow"></span>
					</span>
				</div>
			</div>
			<div class="btn-side dx">
				<div class="btn-wrap" ref="prevDx">
					<span class="red-bg"></span>
					<span class="counts">
						<span class="count">
							<span class="font-bold">{{ prevCount }}</span>
						</span>
						<span class="count">
							<span class="font-bold">{{ prevCount }}</span>
						</span>
					</span>
				</div>
			</div>
		</div>

	</section>

</template>

<script>

export default {

  name: 'Nav',

  props: [ 'prev', 'next', 'prevCount', 'nextCount', 'prevActive', 'nextActive' ],

  data () {
    return {

    }
  },

  computed: {

    mobile () { return isMobile.any }
  },

  watch: {

    prevActive (value) {
      let $target = this.$el.querySelector('.prev.btn')

      if (!value) this.clear($target)
    },

    nextActive (value) {
      let $target = this.$el.querySelector('.next.btn')

      if (!value) this.clear($target)
    }
  },

  methods: {

    mouseleave (event) {
      if (this.mobile) return

      this.clear(event.target)
    },

    mouseenter (event) {
      if (this.mobile) return

      let $target = event.target

      let $sxRedbg = $target.querySelector('.sx .red-bg')

      let $dxRedbg = $target.querySelector('.dx .red-bg')

      let $arrows = $target.querySelector('.arrows')

      let $counts = $target.querySelector('.counts')

      let dir = $target.classList.contains('next') ? 1 : -1

      if (dir < 0 && !this.prevActive || dir > 0 && !this.nextActive) return

      this.$mixer.play('tic')

      TweenMax.killChildTweensOf($target)

      return new TimelineMax({ tweens: [

        new TimelineMax({ tweens: [

          TweenMax.to($sxRedbg, 0.6, { x: '0%', force3D: true, ease: Cubic.easeOut }),

          TweenMax.to($dxRedbg, 0.6, { x: '0%', force3D: true, ease: Cubic.easeOut })

        ],
        stagger: 0.03 }),

        new TimelineMax({ tweens: [

          TweenMax.to($arrows, 0.6, { x: dir > 0 ? '50%' : '-50%', force3D: true, ease: Cubic.easeOut }),

          TweenMax.to($counts, 0.6, { x: dir > 0 ? '-50%' : '50%', force3D: true, ease: Cubic.easeOut })

        ],
        stagger: 0.06 })

      ],
      stagger: 0.09 })
    },

    clear ($target) {
      let $sxRedbg = $target.querySelector('.sx .red-bg')

      let $dxRedbg = $target.querySelector('.dx .red-bg')

      let $arrows = $target.querySelector('.arrows')

      let $counts = $target.querySelector('.counts')

      TweenMax.killChildTweensOf($target)

      return new TimelineMax({ tweens: [

        new TimelineMax({ tweens: [

          TweenMax.to($counts, 0.6, { x: '0%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.to($arrows, 0.6, { x: '0%', force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.03 }),

        new TimelineMax({ tweens: [

          TweenMax.to($dxRedbg, 0.6, { x: '-100%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.to($sxRedbg, 0.6, { x: '100%', force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.0 })

      ],
      stagger: 0.06 })
    },

    leave (el, done) {
      let $refs = this.$refs

      return new TimelineMax({ tweens: [

        new TimelineMax({ tweens: [

          TweenMax.to($refs.prevDx, 1, { x: '-100%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.to($refs.prevSx, 1, { x: '100%', force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.15 }),

        new TimelineMax({ tweens: [

          TweenMax.to($refs.nextDx, 1, { x: '-100%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.to($refs.nextSx, 1, { x: '100%', force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.15 })

      ],
      stagger: 0.25 })
    },

    enter (el, done) {
      let $refs = this.$refs

      return new TimelineMax({ tweens: [

        new TimelineMax({ tweens: [

          TweenMax.from($refs.nextSx, 1, { x: '100%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.from($refs.nextDx, 1, { x: '-100%', force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.15 }),

        new TimelineMax({ tweens: [

          TweenMax.from($refs.prevSx, 1, { x: '100%', force3D: true, ease: Cubic.easeInOut }),

          TweenMax.from($refs.prevDx, 1, { x: '-100%', force3D: true, ease: Cubic.easeInOut })

        ],
        stagger: 0.15 })

      ],
      stagger: 0.25 })
    }
  }
}
</script>

<style lang="scss">

	$width: 44px;

	$height: 44px;

	#leaf-nav {

		position: static;

		.btn {

			position: absolute;

			width: $width * 2; height: $height;

			right: 90px; top: 50%;

		    margin-right: -$width;

		    cursor: default;

		    z-index: 2;

			opacity: .2;

			@include transition( opacity 1s map-get( $ease, cubic_out ) );

			&.active {

				opacity: 1;

				cursor: pointer;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				top: auto; bottom: 90px;

				right: 0; margin-right: 0;

				width: $width;
			}

			.btn-side {

				position: absolute;

				overflow: hidden;

				width: $width; height: $height;

		    	line-height: $height;

    			text: {

    				align: center;
    			}

				.btn-wrap {

					position: relative;

					width: $width; height: $height;

					background: {

						color: map-get( $colors, dark );
					}

					.red-bg {

						position: absolute;

						top: 0; left: 0;

						width: 100%; height: 100%;

						background: {

							color: map-get( $colors, red );
						}
					}
				}

				.counts {

					position: absolute;

					top: 0; left: 0;

					width: 200%; height: 100%;

					.count {

						position: relative;

						color: map-get( $colors, white );

						float: left; width: 50%;

						display: block;

						font: {

							size: map-get( $typo, c_ );
						}
					}
				}

				.arrows {

					position: absolute;

					top: 0; left: 0;

					width: 200%; height: 100%;

					.arrow {

						position: absolute;

						top: 50%;

						&:before, &:after {

							position: absolute;

							top: 0; left: 0;
						}

						&:before {

							content: '';

							width: 20px; height: 2px;

							margin: 0px 0 0 -10px;
						}

						&:after {

							content: '';

							width: 2px; height: 10px;

							margin: -8px 0 0 9px;

							@include transform-origin( 0% 100% );

							@include rotate( -50deg );
						}

						&.red:before, &.red:after {

							background: {

								color: map-get( $colors, red );
							}
						}

						&.white:before, &.white:after {

							background: {

								color: map-get( $colors, white );
							}
						}
					}
				}

				&.sx {

					left: 0;

					.btn-wrap {

						.red-bg {

							@include translate( 100%, 0 );
						}
					}

					.counts {

						left: 0;
					}

					.arrows {

						left: 0;

						.arrow {

							@include rotate( 180deg );

							&.red {

								left: 25%;
							}

							&.white {

								left: 75%;
							}
						}
					}
				}

				&.dx {

					right: 0;

					.btn-wrap {

						.red-bg {

							@include translate( -100%, 0 );
						}
					}

					.counts {

						left: -100%;
					}

					.arrows {

						left: -100%;

						.arrow {

							@include rotate( 0deg );

							&.red {

								left: 75%;
							}

							&.white {

								left: 25%;
							}
						}
					}
				}
			}

			&.next {

				margin-top: -$height;

				.btn-side {

					&.sx {

						@media ( max-width: map-get( $sizes, custom ) - 1 ) {

							display: none;
						}
					}
				}
			}

			&.prev {

				margin-top: 1px;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					margin-bottom: -$height;

					margin-top: auto;
				}

				.btn-side {

					&.dx {

						@media ( max-width: map-get( $sizes, custom ) - 1 ) {

							display: none;
						}
					}
				}
			}
		}
	}

</style>
