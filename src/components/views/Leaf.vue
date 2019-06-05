
<template>

	<transition

    	@enter="enter"

    	@leave="leave"

    	:css="false">

		<section class="leaf">

			<scroller ref="scroller">

				<div class="main row" ref="mainrow">

					<div class="table">
						<div class="table-cell">

							<h1>
								<span>
									<span class="font-reg">
										<span class="letter" v-for="letter in model.label" :class="{ 'space': letter == ' ' }" ref="letters">{{ letter }}</span>
									</span>
									<span class="line" ref="line"></span>
								</span>
							</h1>
              <h4 class="why-desc">{{ model.desc }}</h4>
						</div>
					</div>

				</div>

				<div class="row" v-for="content in model.contents">

					<component :is="'leaf-'+content.type" :model="content" ref="compo"></component>

				</div>

			</scroller>

		</section>

	</transition>

</template>

<script>

import { mapState, mapActions } from 'vuex'

import { Actions, Events } from '../../constants'

import Scroller from '../include/Scroller.vue'

import Section from '../mixins/Section'

import Video from '../leaf/Video.vue'

import Image from '../leaf/Image.vue'

import Quote from '../leaf/Quote.vue'

import Tbox from '../leaf/Tbox.vue'

import Link from '../leaf/Link.vue'

import meta from '../../meta'

export default {

  name: 'Leaf',

  props: [ 'model' ],

  mixins: [ Section ],

  data () {
    return {

      loaded: false,

      ontop: true
    }
  },

  components: {

    'scroller': Scroller,

    'leaf-video': Video,

    'leaf-image': Image,

    'leaf-quote': Quote,

    'leaf-tbox': Tbox,

    'leaf-link': Link
  },

  methods: {

    ...mapActions([

      Actions.UPDATE_UISTATE ]),

    initialize () {
      this.setup()

      this.resize()

      this.preload()
    },

    preload () {
      let manifest = []

      let loader = new createjs.LoadQueue(true)

      console.time('leaf')

      for (let content of this.model.contents) {
        let src = content.type == 'image'
          ? content.source
          : content.type == 'video'
            ? content.poster
            : null

        if (src) manifest.push({ src })
      }

      loader.on('complete', event => {
        console.timeEnd('leaf')

        this.loaded = true

        // this.resize()
      })

      if (manifest.length <= 0) {
        console.timeEnd('leaf')

        this.loaded = true
      } else loader.loadManifest(manifest)
    },

    setup () {
      let rows = []

      let $rows = this.$el.querySelectorAll('.row')

      for (let i = this.$refs.compo.length - 1; i >= 0; i--) {
        let $el = $rows[ i + 1 ]

        let compo = this.$refs.compo[ i ]

        let flag = false

        rows.push({ $el, compo, flag })
      }

      this.rows = rows
    },

    render () {
      let $refs = this.$refs

      let scroller = $refs.scroller

      let scrollTop = scroller ? scroller.top() : 0

      let absScrollTop = Math.abs(scrollTop)

      let offset = absScrollTop + window.innerHeight * 0.75

      if (this.loaded) {
        for (var i = this.rows.length - 1; i >= 0; i--) {
	        			let row = this.rows[ i ]

          if (row.$el.offsetTop < offset && !row.flag) {
            row.compo.enter()

	    					row.flag = true
	        			} else if (row.$el.offsetTop > offset && row.flag) {
	        				row.compo.leave()

	        				row.flag = false
	        			}
	        		}
      }

      if (absScrollTop > 0 && this.ontop) {
        meta.scrollontop = false

        this.$bus.emit(Events.UISTATE, { visible: false })

        this.ontop = false
      } else if (absScrollTop == 0 && !this.ontop) {
        meta.scrollontop = true

        this.$bus.emit(Events.UISTATE, { visible: true })

        this.ontop = true
      }

      meta.scrollTop = absScrollTop
    },

    leave (el, done) {
      let $refs = this.$refs

      let scroller = $refs.scroller

      let stagger = meta.scrollontop ? 0 : 2

      let $scrollbar = scroller.$el.querySelector('.iScrollIndicator')

      this.$bus.emit(Events.LEAF_LEAVE)

      return new TimelineMax({ tweens: [

        this.ontop ? new TimelineMax() : scroller.gotoTop(),

        new TimelineMax({ tweens: [

          TweenMax.allTo($refs.letters, 1, { y: 75, force3D: true, ease: Cubic.easeInOut }, 0.02),

          TweenMax.to($refs.line, 1, { scaleX: 0, ease: Cubic.easeInOut }),

          TweenMax.to($scrollbar || { scaleY: 1 }, 1, { scaleY: 0, opacity: 0, ease: Cubic.easeInOut })

        ] })

      ],
      stagger,
      onUpdate: () => {
        this.render()
      },
      onComplete: () => {
        scroller.destroy()

        if (done instanceof Function) { done() }
      } })
    },

    enter (el, done) {
      let $refs = this.$refs

      let scroller = $refs.scroller

      let delay = meta.scrollontop ? 0.75 : 2.75

      let $scrollbar = scroller.$el.querySelector('.iScrollIndicator')

      return new TimelineMax({ tweens: [

        TweenMax.allFrom($refs.letters, 1, { y: 75, force3D: true, ease: Cubic.easeOut }, 0.06),

        TweenMax.from($refs.line, 1, { scaleX: 0, ease: Cubic.easeOut }),

        TweenMax.from($scrollbar || { scaleY: 1 }, 1, { scaleY: 0, opacity: 0, ease: Cubic.easeOut })

      ],
      delay,
      onComplete: () => {
        this.resize()

        this.$bus.emit(Events.LEAF_READY)

        if (done instanceof Function) { done() }
      } })
    },

    resize () {
      let $refs = this.$refs

      let mainrow = $refs.mainrow

      let scroller = $refs.scroller

      if (mainrow) { TweenMax.set(mainrow, { height: window.innerHeight }) }

      if (scroller) { scroller.resize() }
    }
  },

  mounted () {
    this.$resizer.bus.on(Events.RESIZE, this.resize)

    this.$ticker.add(this.render)

    this.initialize()
  },

  destroyed () {
    this.$ticker.remove(this.render)

    this.$resizer.bus.off(Events.RESIZE, this.resize)
  }
}
</script>

<style lang="scss">

	section.leaf {

		//display: none;

		position: absolute;

		top: 0; left: 0; bottom: 0; right: 0;

		h1 {

			overflow: visible;

			color: map-get( $colors, dark );

			letter-spacing: map-get( $ls, s );

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				font: {

					size: map-get( $typo, h1_ ) * 0.625;
				}
			}

			span.font-reg {

				display: inline-table;

				overflow: hidden;
			}

			.line {

				position: absolute;

				bottom: -10px; left: 50px; right: 50px;

				height: 2px;

			    background: {

					color: map-get( $colors, dark );
				}

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					bottom: -15px; left: 30px; right: 30px;
				}
			}
		}

		.scroller {

			left: 90px; right: 87px;

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				left: 0; right: 0;
			}

			.scroller-body {

				padding: 0 0 40px;

				margin-right: 3px;

				@media ( max-width: map-get( $sizes, custom ) - 1 ) {

					margin-right: 0;
				}
			}

			.iScrollVerticalScrollbar {

				top: 4px; bottom: 4px;

				width: 2px;

				.iScrollIndicator {

					background: {

						color: map-get( $colors, red );
					}
				}
			}
		}

		.row {

			position: relative;

			overflow: hidden;

			width: 100%; height: auto;
		}
	}
section.root .why-desc{
    color: #000;
    max-width: 522px;
    margin: 0 auto;
    text-align: left;
    margin-top: 40px;
    font-size: 16px;
    line-height: 26px;
  }
</style>
