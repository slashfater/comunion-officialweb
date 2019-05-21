
<template>

	<div class="send-message">

		<div class="table">
			<div class="table-cell">

				<form @submit.prevent="">

					<span class="row" ref="nameRow">
						<span class="left line"><span ref="nameLeftLineFocus"></span></span>
						<span class="input"><input type="text" v-model="name" name="name" :placeholder="locale.form.name+'*'" @focus="focus" @blur="blur" ref="name"></span>
						<span class="right line" ref="nameLine"><span ref="nameRightLineFocus"></span></span>
					</span>

					<span class="row" ref="emailRow">
						<span class="left line"><span ref="emailLeftLineFocus"></span></span>
						<span class="input"><input type="text" v-model="email" name="email" :placeholder="locale.form.email+'*'" @focus="focus" @blur="blur" ref="email"></span>
						<span class="right line" ref="emailLine"><span ref="emailRightLineFocus"></span></span>
					</span>

					<span class="row text" ref="messRow">
						<span class="left line"><span ref="messLeftLineFocus"></span></span>
						<span class="input"><textarea type="text" v-model="message" name="mess" :placeholder="locale.form.message+'*'" @focus="focus" @blur="blur" ref="mess"></textarea></span>
						<span class="right line" ref="messLine"><span ref="messRightLineFocus"></span></span>
					</span>

					<main-btn class="red" :click="submit" ref="submit">
						<span class="font-reg">{{ locale.form.send }}</span>
					</main-btn>

					<p class="status" :class="{ 'info': status.sending, 'error': status.error, 'show': status.sending || status.error }"><span class="font-reg">{{ status.message || locale.form.warn }}</span></p>

					<!--p class="warning" ref="warning"><span class="font-reg">{{ locale.form.warn }}</span></p-->

					<!--p class="error" :class="{ 'show': error.active }" ref="error"><span class="font-reg">{{ error.message }}</span></p-->

				</form>

			</div>
		</div>

	</div>

</template>

<script>

import { mapState, mapActions } from 'vuex'

import { Actions, Sizes } from '../../constants'

import MainBtn from '../btns/MainBtn.vue'

export default {

  name: 'SendMessage',

  props: [ 'submit', 'status', 'clear' ],

  data () {
    return {

    }
  },

  watch: {

    locale (value) {
      if (value) { this.resize() }
    }
  },

  computed: {

    ...mapState({

      locale: state => state.site.locale
    }),

    name: {

      get () {
        return this.$store.state.site.user.name
      },

      set (value) {
        this.updateUser({ name: value })
      }
    },

    email: {

      get () {
        return this.$store.state.site.user.email
      },

      set (value) {
        this.updateUser({ email: value })
      }
    },

    message: {

      get () {
        return this.$store.state.site.user.message
      },

      set (value) {
        this.updateUser({ message: value })
      }
    }
  },

  components: {

    'main-btn': MainBtn
  },

  methods: {

    ...mapActions([ Actions.UPDATE_USER ]),

    focus (event) {
      let name = event.target.name

      let leftLine = this.$refs[ name + 'LeftLineFocus' ]

      let rightLine = this.$refs[ name + 'RightLineFocus' ]

      TweenMax.killTweensOf(leftLine)

      TweenMax.killTweensOf(rightLine)

      this.clear()

      return new TimelineMax({ tweens: [

        TweenMax.to(leftLine, 1, { scaleX: 1, ease: Cubic.easeInOut }),

        TweenMax.to(rightLine, 1, { scaleX: 1, ease: Cubic.easeOut })

      ],
      stagger: 0.65 })
    },

    blur (event) {
      let name = event.target.name

      let leftLine = this.$refs[ name + 'LeftLineFocus' ]

      let rightLine = this.$refs[ name + 'RightLineFocus' ]

      TweenMax.killTweensOf(leftLine)

      TweenMax.killTweensOf(rightLine)

      this.clear()

      return new TimelineMax({ tweens: [

        TweenMax.to(rightLine, 1, { scaleX: 0, ease: Cubic.easeOut }),

        TweenMax.to(leftLine, 1, { scaleX: 0, ease: Cubic.easeOut })

      ],
      stagger: 0.35 })
    },

    resize () {
      let $refs = this.$refs

      let deskscreen = window.innerWidth > Sizes.CUSTOM - 1

      let sideWidth = deskscreen

							  ? window.innerWidth / 2 - 90 - 60 * 2 - 20

							  : window.innerWidth - 100 - 15

      TweenMax.set([ $refs.name, $refs.email ], { width: sideWidth * 0.6 })

      TweenMax.set([ $refs.nameLine, $refs.emailLine ], { width: sideWidth * 0.4 })

      TweenMax.set([ $refs.mess ], { width: sideWidth * 0.8 })

      TweenMax.set([ $refs.messLine ], { width: sideWidth * 0.2 })
    }
  }
}
</script>

<style lang="scss">

	.send-message {

		position: relative;

		width: 100%; height: 100%;

		@media ( max-width: map-get( $sizes, custom ) - 1 ) {

		    padding-top: 50px;
		}

		form {

			position: relative;

			text-align: right;

			@media ( max-width: map-get( $sizes, custom ) - 1 ) {

				text-align: center;
			}

			.row {

				position: relative;

				padding: 5px 0;

				overflow: hidden;

				display: block;

				.input {

					position: relative;

					padding-left: 20px;

					float: left;

					@media ( max-width: map-get( $sizes, custom ) - 1 ) {

						padding-left: 15px;
					}

					input {

						width: 200px;

						padding: 15px;

						background: none;

						color: map-get( $colors, white );

						letter-spacing: map-get( $ls, xs );

						font: {

							family: "din-condensed", sans-serif;

							size: map-get( $typo, h4_ );
						}

						text: {

							transform: uppercase;
						}

						&:-webkit-autofill,
						&:-webkit-autofill:hover,
						&:-webkit-autofill:focus,
						&:-webkit-autofill:active {

							-webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
							-webkit-transition-delay: 9999s;
						}

						@media ( max-width: map-get( $sizes, custom ) - 1 ) {

							size: map-get( $typo, p_ );
						}
					}

					textarea {

						width: 385px;

						height: 120px;

						padding: 15px;

						resize: none;

						background: none;

						line-height: 1.25em;

						color: map-get( $colors, white );

						letter-spacing: map-get( $ls, xs );

						font: {

							family: "din-condensed", sans-serif;

							size: map-get( $typo, h4_ );
						}

						text: {

							transform: uppercase;
						}

						@media ( max-width: map-get( $sizes, custom ) - 1 ) {

							size: map-get( $typo, p_ );
						}
					}
				}

				.line {

					//display: none;

					position: absolute;

					top: 28px; height: 2px;

					margin-top: -1px;

					background: {

						color: rgba(255,255,255,.3);
					}

					&.left {

						left: 0; width: 20px;

						@media ( max-width: map-get( $sizes, custom ) - 1 ) {

							width: 15px;
						}
					}

					&.right {

						right: 0; //left: ( 175px + 15px );
					}

					span {

						position: absolute;

						top: 0; left: 0; bottom: 0; right: 0;

						@include transform-origin( 0 0 );

						@include scale( 0, 1 );

						background: {

							color: map-get( $colors, red );
						}
					}
				}

				&.text {

					.line {

						&.right {

							/*left: ( 385px + 20px );

							@media ( max-width: map-get( $sizes, custom ) - 1 ) {

								left: ( 225px + 20px );
							}

							@media ( max-width: map-get( $sizes, smarthphone ) - 1 ) {

								left: ( 185px + 20px );
							}*/
						}
					}
				}
			}

			button.main-btn {

				display: inline-block;

				margin-right: -5px;
			}

			p {

				text: {

					transform: uppercase;
				}

				&.warning {

					color: map-get( $colors, white );

					margin-top: 35px;
				}

				&.status {

					color: map-get( $colors, cyan );

					margin-top: 35px;

					opacity: 0;

					@include transition( opacity .5s ease-out );

					&.show {

						opacity: 1;
					}

					&.error {

						color: map-get( $colors, white );
					}
				}
			}
		}
	}

</style>
