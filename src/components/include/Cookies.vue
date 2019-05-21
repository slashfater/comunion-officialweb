
<template>

	<div id="cookies">

		<p v-if="locale">
			<span class="row">
				<span class="copy" ref="copy">
					<span class="font-reg" v-html="locale.cookies.copy"></span><br>
				</span>
			</span>
			<span class="row">
				<span class="cta" ref="cta">
					<a :href="locale.cookies.link" target="_blank">
						<span class="font-reg">{{ locale.cookies.cta }}</span>
					</a>
				</span>
			</span>
		</p>

	</div>

</template>

<script>

import { mapState } from 'vuex'

export default {

  name: 'Cookies',

  data () {
    return {

    }
  },

  computed: mapState({

    locale: state => state.site.locale
  }),

  methods: {

    enter () {
      let $refs = this.$refs

      TweenMax.set(this.$el, { autoAlpha: 1 })

      return new TimelineMax({ tweens: [

        TweenMax.from($refs.copy, 1, { y: '100%', force3D: true, ease: Cubic.easeInOut }),

        TweenMax.from($refs.cta, 1, { y: '100%', force3D: true, ease: Cubic.easeInOut })

      ],
      stagger: 0.15 })
    }
  },

  mounted () {
    TweenMax.set(this.$el, { autoAlpha: 0 })
  }
}
</script>

<style lang="scss">

	#cookies {

		position: relative;

   		margin-top: 45px;

		p {

			color: map-get( $colors, rgb_half_white );

			letter-spacing: map-get( $ls, xs ) * 1.5;

			line-height: 1.5em;

			padding: 20px;

			font: {

				size: map-get( $typo, h4_ );
			}

			text: {

				transform: uppercase;
			}

			.row {

				display: block;

				overflow: hidden;

				>span {

					display: block;
				}
			}

			a {

				color: map-get( $colors, white );

				display: inline-block;

				padding: 10px;

				text: {

					decoration: none;
				}
			}
		}
	}

</style>
