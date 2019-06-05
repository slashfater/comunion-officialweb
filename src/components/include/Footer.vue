<template>

	<footer :class="{ 'off': !active }">

		<span class="mouse-icon" :class="{ 'off': !scroll, 'mobile': mobile }"><!--!scroll && deskscreen-->

			<span class="gsap">
				<span class="border"></span>
				<span class="point" ref="point"><span></span></span>
				<span class="label">
					<span class="font-reg">{{ mobile ? locale.ui.swipe : locale.ui.scroll }}</span>
				</span>
			</span>

		</span>

		<span class="scroll-line" :class="{ 'off': !scroll }"><!--!scroll && deskscreen-->
			<span ref="scrollLineBar"><span></span></span>
		</span>

		<span class="audio-icon" :class="{ 'muted': muted }" @click="toggle">

			<span class="gsap">
				<div class="icon">
					<img :src="assets['audio'].src" :class="{ 'show': !inversed }" alt="">
					<img :src="assets['audio2'].src" :class="{ 'show': inversed }" alt="">
				</div>
			</span>

		</span>

		<p class="lang" @click="toggleLang">
			<span class="gsap">
				<div class="icon">

					<span class="font-reg">{{ lang }}</span>

				</div>
			</span>
		</p>

		<!-- <p class="foo">
			<span class="gsap">
				<span>

					<span class="font-reg">{{ locale.footer.rights }}</span>

					<a :href="'mailto:'+locale.footer.email" target="_self"><span class="font-reg">{{ locale.footer.email }}</span></a>

				</span>
			</span>
		</p> -->

	</footer>

</template>

<script>

import { mapState } from 'vuex'

import { Events, Sizes } from '../../constants'

import Commons from '../mixins/Commons'

export default {

  name: 'Footer',

  mixins: [ Commons ],

  data () {
    return {

      active: true,

      scroll: true,

      muted: false,

      inversed: false
    }
  },

  computed: {

    ...mapState({

      locale: state => state.site.locale,

      assets: state => state.site.assets
    }),

    deskscreen () { return window.innerWidth > Sizes.CUSTOM - 1 },

    lang () { return window.appconf.lang == 'en' || window.appconf.lang == '' ? 'cn' : 'en' },

    mobile () { return isMobile.any }
  },

  methods: {

    initialize () {
      this.iconTimeline = new TimelineMax({ tweens: [

        TweenMax.fromTo(this.$refs.point, 1.5, { opacity: 0 }, { opacity: 1, ease: Cubic.easeOut }),

        new TimelineMax({ tweens: [

          TweenMax.to(this.$refs.point, 1.5, { y: 18, force3D: true, ease: Cubic.easeOut }),

          TweenMax.to(this.$refs.point, 1.5, { opacity: 0, ease: Cubic.easeOut })

        ],
        stagger: 0.25 })

      ],
      stagger: 1,
      repeat: -1 })

      this.lineTimeline = new TimelineMax({ tweens: [

        TweenMax.fromTo(this.$refs.scrollLineBar, 1.5, { opacity: 0, y: -40 }, { opacity: 1, bezier: { values: [ { y: 0 }, { y: 40 } ], curviness: 0 }, force3D: true, ease: Cubic.easeInOut })

      ],
      repeatDelay: 1,
      repeat: -1 })
    },

    update (state) {
      if (state.theme !== undefined) { this.inversed = state.theme == 'light' }

      if (state.visible !== undefined) { this.active = state.visible }

      if (state.scroll !== undefined) { this.scroll = state.scroll }
    },

    toggle () {
      this.muted = !this.muted

      this.$mixer.toggle()
    },

    enter () {
      let $icon = this.$el.querySelector('.mouse-icon .gsap')

      let $mute = this.$el.querySelector('.audio-icon .gsap')

      let $lang = this.$el.querySelector('p.lang .gsap')

      let $foo = this.$el.querySelector('p.foo .gsap')

      return new TimelineMax({ tweens: [

        TweenMax.from($lang, 1, { y: 40, force3D: true, ease: Cubic.easeInOut }),

        TweenMax.from($icon, 1, { opacity: 0, y: 15, force3D: true, ease: Cubic.easeOut }),

        TweenMax.from($foo, 1, { y: 20, force3D: true, ease: Cubic.easeInOut }),

        TweenMax.from($mute, 1, { y: 40, force3D: true, ease: Cubic.easeInOut })

      ],
      stagger: 0.1 })
    }
  },

  created () {
    this.$bus.on(Events.UISTATE, this.update)
  },

  mounted () {
    this.initialize()
  },

  destroyed () {
    this.$bus.off(Events.UISTATE, this.update)

    if (this.iconTimeline) { this.iconTimeline.kill() }

    if (this.lineTimeline) { this.lineTimeline.kill() }
  }
}
</script>

<style lang="scss">

	footer {

		position: absolute;

		bottom: 35px; left: 0; right: 0;

		z-index: 5;

		text: {

			align: center;
		}

		.mouse-icon {

			position: absolute;

			bottom: 90px; left: 50%;

			width: 16px; height: 32px;

			margin: -8px 0 0 -8px;

			@include transition( all .6s map-get( $ease, cubic_out ) );

			@include transition-delay( 0.1s );

			&.off {

				@include translate( 0, 15px );

				opacity: 0;
			}

			&.mobile {

				height: 14px;

				.point {

					display: none !important;
				}
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				bottom: 12px;
			}

			.gsap {

				position: absolute;

				top: 0; left: 0;

				width: 100%; height: 100%;
			}

			.border {

				position: absolute;

				top: 0; left: 0; right: 0; bottom: 0;

				border: 2px solid map-get( $colors, com_main );

				border-radius: 10px;

				@include transition( border-color .8s map-get( $ease, cubic_out ) );
			}

			.point {

				position: absolute;

				top: 5px; left: 50%;

				width: 4px; height: 4px;

				margin-left: -2px;

				>span {

					position: absolute;

					top: 0; left: 0;

					width: 100%; height: 100%;

					border-radius: 50%;

					background: {

						color: map-get( $colors, rgb_full_white );
					}

					@include transition( background-color .8s map-get( $ease, cubic_out ) );
				}
			}

			.label {

				position: absolute;

				top: 50%; left: 0;

				margin: -6px 0 0 30px;

				color: map-get( $colors, white );

				letter-spacing: map-get( $ls, s );

				text: {

					transform: uppercase;
				}

				font: {

					size: map-get( $typo, s_ );
				}

				@include transition( color .8s map-get( $ease, cubic_out ) );
			}
		}

		.scroll-line {

			position: absolute;

			overflow: hidden;

			bottom: 30px; left: 50%;

			width: 2px; height: 40px;

			margin: 0px 0 0 -1px;

			@include transition( opacity .8s map-get( $ease, cubic_out ) );

			&.off {

				opacity: 0;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				bottom: -45px;
			}

			span {

				position: absolute;

				top: 0; left: 0; right: 0; bottom: 0;

				>span {

					position: absolute;

					top: 0; left: 0; right: 0; bottom: 0;

					background: {

						color: map-get( $colors, white );
					}

					@include transition( background-color .8s map-get( $ease, cubic_out ) );
				}
			}
		}

		.audio-icon {
			display: none;
			position: absolute;

			overflow: hidden;

			bottom: -12px; right: 20px;

			width: 50px; height: 50px;

			z-index: 1;

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				visibility: hidden;

				opacity: 0;
			}

			.gsap {

				position: absolute;

				top: 0; left: 0;

				width: 100%; height: 100%;
			}

			.icon {

				position: relative;

				width: 100%; height: 100%;

				cursor: pointer;

				@include transition( opacity .5s map-get( $ease, cubic_out ) );

				&:hover {

					@include transition( opacity .5s map-get( $ease, cubic_in_out ) );

					opacity: .4;
				}

				img {

					display: block;

					position: absolute;

					top: 0; left: 0;

					width: 100%; height: 100%;

					opacity: 0;

					@include transition( opacity .5s map-get( $ease, cubic_out ) );

					&.show {

						opacity: 1;
					}
				}

				&:after {

					content: '';

					position: absolute;

					top: 50%; left: 50%;

					width: 17px; height: 2px;

					margin: -1px 0 0 -9px;

					@include transform( rotate( -45deg ) scaleX( 0 ) );

					@include transition( all .5s map-get( $ease, cubic_out ) );

					background: {

						color: map-get( $colors, white );
					}
				}
			}

			&.muted {

				.icon:after {

					@include transform( rotate( -45deg ) scaleX( 1 ) );
				}
			}
		}

		.lang {
			display: none;
			position: absolute;

			bottom: -10px; left: 24px;

			width: 44px; height: 44px;

			letter-spacing: map-get( $ls, s );

			line-height: 44px;

			overflow: hidden;

			cursor: pointer;

			visibility: visible;

			opacity: 1;

			z-index: 2;

			text: {

				transform: uppercase;

				align: center;
			}

			font: {

				size: map-get( $typo, btn_ );
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				visibility: hidden;

				opacity: 0;
			}

			.gsap {

				position: absolute;

				top: 0; left: 0;

				width: 100%; height: 100%;
			}

			.icon {

				position: relative;

				width: 100%; height: 100%;

				cursor: pointer;

				@include transition( opacity .5s map-get( $ease, cubic_out ) );

				&:hover {

					@include transition( opacity .5s map-get( $ease, cubic_in_out ) );

					opacity: .4;
				}

				span {

					@include transition( color .5s map-get( $ease, cubic_out ) );

					color: map-get( $colors, white );
				}
			}
		}

		p {

			position: relative;

			color: map-get( $colors, rgb_light_white );

			letter-spacing: map-get( $ls, s );

			overflow: hidden;

			padding: 5px 0;

			font: {

				size: map-get( $typo, s_ );
			}

			text: {

				transform: uppercase;
			}

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				display: none;
			}

			a {

				color: map-get( $colors, rgb_full_white );

				@include transition( color .8s map-get( $ease, cubic_out ) );

				text: {

					decoration: none;
				}

				margin: {

					left: 20px;
				}
			}

			.gsap {

				position: relative;

				display: inline-block;

				>span {

					position: relative;

					display: inline-block;

					@include translate( 0, 0 );

					@include transition( all .8s map-get( $ease, cubic_out ) );
				}
			}
		}

		.light & {

			.mouse-icon {

				.border {

    				border: 2px solid map-get( $colors, com_main );
				}

				.point {

					>span {

						background: {

							color: map-get( $colors, com_main );
						}
					}
				}

				.label {

					color: map-get( $colors, gray );
				}
			}

			.scroll-line {

				span {

					>span {

						background: {

							color: map-get( $colors, gray );
						}
					}
				}
			}

			.audio-icon {

				.icon {

					&:after {

						background: {

							color: map-get( $colors, gray );
						}
					}
				}
			}

			.lang {

				.icon {

					span {

						color: map-get( $colors, gray );
					}
				}
			}

			p {

				color: map-get( $colors, gray );

				.gsap {

					>span {

						opacity: 0.5;
					}
				}

				a {

					color: map-get( $colors, gray );
				}
			}
		}

		.color & {

			.mouse-icon {

				.border {

    				border: 2px solid map-get( $colors, white );
				}

				.point {

					>span {

						background: {

							color: map-get( $colors, white );
						}
					}
				}
			}
		}

		&.off {

			.mouse-icon {

				@include translate( 0, 15px );

				opacity: 0;
			}

			.scroll-line {

				opacity: 0;
			}

			p {

				.gsap {

					>span {

						@include translate( 0, 20px );
					}
				}
			}
		}
	}

</style>
