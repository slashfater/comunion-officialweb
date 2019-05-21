
<template>

	<transition

    	@enter="enter"

    	@leave="leave"

    	:css="false">

		<section id="contacts" class="root">

			<div class="left side" ref="leftSide">

				<div class="holder" ref="leftSideHold">

					<div class="table">
						<div class="table-cell">

							<div class="main row">
								<h2>
									<span class="font-reg">
										<span class="letter" v-for="letter in 'Contacts'" :class="{ 'space': letter == ' ' }" ref="leftSideLetters">{{ letter }}</span>
									</span>
								</h2>
								<span class="line" ref="leftSideLine"></span>
								<p ref="leftSideCopy"><span class="font-reg" v-html="locale.contacts.copy"></span></p>
								<p ref="leftSideAdress" class="address">
									<span class="font-reg" v-html="locale.contacts.phone"></span><br>
									<span class="font-reg" v-html="locale.contacts.email"></span><br>
									<span class="font-reg" v-html="locale.contacts.address"></span>
								</p>
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
												<span class="letter" v-for="letter in 'Contacts'" :class="{ 'space': letter == ' ' }" ref="rightSideLetters">{{ letter }}</span>
											</span>
										</h2>
										<span class="line" ref="rightSideLine"></span>
										<p ref="rightSideCopy"><span class="font-reg" v-html="locale.contacts.copy"></span></p>
										<p ref="rightSideAdress" class="address">
											<span class="font-reg" v-html="locale.contacts.phone"></span><br>
											<span class="font-reg" v-html="locale.contacts.email"></span><br>
											<span class="font-reg" v-html="locale.contacts.address"></span>
										</p>
									</div>

								</div>
							</div>

							<span class="v-line"></span>

						</div>

						<send-message :submit="submit" :status="status" :clear="clear" ref="form"></send-message>

					</scroller>

				</div>

			</div>

		</section>

	</transition>

</template>

<script>

import axios from 'axios'

import { mapState } from 'vuex'

import { Events, Sizes } from '../../constants'

import Section from '../mixins/Section'

import Scroller from '../include/Scroller.vue'

import SendMessage from '../forms/SendMessage.vue'

import meta from '../../meta'

export default {

  name: 'Contacts',

  mixins: [ Section ],

  data () {
    return {

      ontop: true,

      status: {

        error: false,

        sending: false,

        message: null
      }
    }
  },

  computed: {

    ...mapState({

      locale: state => state.site.locale,

      user: state => state.site.user
    })
  },

  components: {

    'scroller': Scroller,

    'send-message': SendMessage
  },

  methods: {

    clear () {
      this.status.error = false
    },

    submit () {
      if (this.status.sending) return

      this.clear()

      let form = this.locale.form

      if (this.$sender.validate(this.user)) {
        this.status = {

          message: form.sending,

          sending: true,

          error: false
        }

        this.$sender.submit(this.user).then(response => {
          let success = response > 0

          let message = success ? form.success : form.send_error

          this.status.message = message

          this.status.error = !success

          TweenMax.delayedCall(3, () => {
            this.status.sending = false

            this.status.error = false
          })
        }, error => this.status = {

          message: error.statusText,

          sending: false,

          error: true
        })
      } else {
        this.status = {

          message: form[ this.$sender.error ],

          sending: false,

          error: true
        }
      }
    },

    render () {
      let $refs = this.$refs

      let scroller = $refs.scroller

      let scrollTop = scroller ? scroller.top() : 0

      let absScrollTop = Math.abs(scrollTop)

      if (absScrollTop > 0 && this.ontop) {
        this.$bus.emit(Events.UISTATE, { visible: false })

        this.ontop = false
      } else if (absScrollTop == 0 && !this.ontop) {
        this.$bus.emit(Events.UISTATE, { visible: true })

        this.ontop = true
      }
    },

    leave (el, done) {
      let $refs = this.$refs

      let delay = meta.scrollontop ? 0 : 2

      let offset = window.innerHeight

      let deskscreen = window.innerWidth > Sizes.CUSTOM - 1

      return deskscreen

        ? new TimelineMax({ tweens: [

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [

            TweenMax.to($refs.leftSide, 1, { y: -offset, force3D: true, ease: Cubic.easeInOut }),

            TweenMax.to($refs.leftSideHold, 1, { y: offset * 0.5, force3D: true, ease: Cubic.easeInOut })

          ] }),

          new TimelineMax({ tweens: [

            TweenMax.to($refs.rightSide, 1, { y: -offset, force3D: true, ease: Cubic.easeInOut }),

            TweenMax.to($refs.rightSideHold, 1, { y: offset * 0.5, force3D: true, ease: Cubic.easeInOut })

          ] })

        ],
        stagger: 0.12,
        delay,
        onComplete: done })

        : new TimelineMax({ tweens: [

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [

            TweenMax.to($refs.rightSide, 1, { y: -offset, force3D: true, ease: Cubic.easeInOut }),

            TweenMax.to($refs.rightSideHold, 1, { y: offset * 0.5, force3D: true, ease: Cubic.easeInOut })

          ] })

        ],
        stagger: 0.12,
        delay,
        onComplete: done })
    },

    enter (el, done) {
      let $refs = this.$refs

      let $form = $refs.form.$refs

      let delay = meta.scrollontop ? 0 : 2

      let offset = window.innerHeight

      let deskscreen = window.innerWidth > Sizes.CUSTOM - 1

      return deskscreen

        ? new TimelineMax({ tweens: [

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [

            TweenMax.from($refs.leftSide, 1, { y: offset, force3D: true, ease: Cubic.easeInOut }),

            TweenMax.from($refs.leftSideHold, 1, { y: -offset, force3D: true, ease: Cubic.easeInOut }),

            new TimelineMax({ tweens: [

              TweenMax.from($refs.leftSideLetters, 1.2, { y: offset * 0.25, force3D: true, ease: Cubic.easeOut }),

              TweenMax.from($refs.leftSideLine, 1.2, { y: offset * 0.25, force3D: true, ease: Cubic.easeOut }),

              TweenMax.allFrom([ $refs.leftSideCopy, $refs.leftSideAdress ], 1.2, { y: offset * 0.25, force3D: true, ease: Cubic.easeOut }, 0.1)

            ],
            stagger: 0.1 })

          ] }),

          new TimelineMax({ tweens: [

            TweenMax.from($refs.rightSide, 1, { y: offset, force3D: true, ease: Cubic.easeInOut }),

            TweenMax.from($refs.rightSideHold, 1, { y: -offset, force3D: true, ease: Cubic.easeInOut }),

            new TimelineMax({ tweens: [

              TweenMax.allFrom([

                $form.nameRow, $form.emailRow,

                $form.messRow, $form.submit.$el

                /* $form.warning */ ], 1.2, { y: offset * 0.25, force3D: true, ease: Cubic.easeOut }, 0.1)

            ] })

          ] })

        ],
        stagger: 0.12,
        delay,
        onComplete: done })

        : new TimelineMax({ tweens: [

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [ TweenMax.to({ value: 0 }, 1, { value: 1, ease: Cubic.easeInOut }) ] }),

          new TimelineMax({ tweens: [

            TweenMax.from($refs.rightSide, 1, { y: offset, force3D: true, ease: Cubic.easeInOut }),

            TweenMax.from($refs.rightSideHold, 1, { y: -offset, force3D: true, ease: Cubic.easeInOut }),

            new TimelineMax({ tweens: [

              TweenMax.from($refs.rightSideLetters, 1.2, { y: offset * 0.25, force3D: true, ease: Cubic.easeOut }),

              TweenMax.from($refs.rightSideLine, 1.2, { y: offset * 0.25, force3D: true, ease: Cubic.easeOut }),

              TweenMax.allFrom([ $refs.rightSideCopy, $refs.rightSideAdress ], 1.2, { y: offset * 0.25, force3D: true, ease: Cubic.easeOut }, 0.1)

            ],
            stagger: 0.1 })

          ] })

        ],
        stagger: 0.12,
        delay,
        onComplete: done })
    },

    resize () {
      let $refs = this.$refs

      let form = $refs.form

      let mainrow = $refs.mainrow

      let scroller = $refs.scroller

      if (mainrow) { TweenMax.set(mainrow, { height: window.innerHeight }) }

      if (scroller) { scroller.resize() }

      if (form) { form.resize() }
    }
  },

  mounted () {
    this.$resizer.bus.on(Events.RESIZE, this.resize)

    this.$ticker.add(this.render)

    this.$refs.scroller.disable()

    this.resize()
  },

  destroyed () {
    this.$resizer.bus.off(Events.RESIZE, this.resize)
  }
}
</script>

<style lang="scss">

	section.root {

		&#contacts {

			color: map-get( $colors, white );

			.side {

				.main.row {

					p {

						&.address {

							color: rgba(255,255,255,1);

							margin: 35px 0 90px 0;

							@media ( max-width: map-get( $sizes, custom ) - 1 ) {

								margin: 35px 0 0 0;
							}

							a {
								color: rgba(255,255,255,1);

								text: {

									decoration: none;
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

					padding: 0 60px;

					width: 100%; height: 100%;

					margin-right: 3px;

					@media ( max-width: map-get( $sizes, custom ) - 1 ) {

						padding: 0 50px 100px;

						width: auto; height: auto;

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
