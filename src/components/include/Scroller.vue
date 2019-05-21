
<template>

	<div class="scroller">

		<div class="scroller-body">

			<slot></slot>

		</div>

	</div>

</template>

<script>

import IScroll from 'iscroll/build/iscroll'

// import IScroll from 'iscroll/build/iscroll-probe.js'

export default {

  name: 'Scroller',

  data () {
    return {

      disposed: false
    }
  },

  methods: {

    top () {
      return this.iscroll ? this.iscroll.y : this.$el.scrollTop
    },

    disable () {
      let iscroll = this.iscroll

      if (iscroll) { iscroll.disable() }
    },

    gotoTop () {
      let scope = this

      return TweenMax.to({ y: scope.top() }, 2, { y: 0,
        ease: Expo.easeInOut,
        onUpdate: function () {
			   				if (scope.iscroll) { scope.iscroll.scrollTo(0, this.target.y, 0) } else scope.$el.scrollTop = this.target.y
					   	},
        onComplete: () => {

					     	// console.log( this.disposed )

        } })

      /* return this.iscroll

					   ? TweenMax.to( { y: this.iscroll.y }, 2, { y: 0, ease: Expo.easeInOut, onUpdate: function () {

				   			scope.iscroll.scrollTo( 0, this.target.y, 0 )

					     }, onComplete: () => {

					     	//console.log( this.disposed )

					     } } )

					   : TweenMax.to( this.$el, 2, { autoAlpha: 0, ease: Expo.easeInOut, onUpdate: function () {

					     }, onComplete: () => {

					     	//console.log( this.disposed )

					     } } ) */
    },

    resize () {
      let iscroll = this.iscroll

      if (iscroll) { iscroll.refresh() }
    },

    destroy () {
      if (this.disposed) {
        let iscroll = this.iscroll

        if (iscroll) { iscroll.destroy() }
      }
    }
  },

  mounted () {
    let mobile = isMobile.any

    if (!mobile) {
      this.iscroll = new IScroll(this.$el, {

        interactiveScrollbars: true,
        scrollbars: 'custom',
		 			wheelspeed: 800,
		 			mouseWheel: true,
        scrollY: true,
		 			scrollX: false,
		 			bounce: false,
		 			probeType: 3,
		 			click: true
		 			// tap: true
      })
    } else {
      TweenMax.set(this.$el, {

        overflow: 'auto',

        webkitOverflowScrolling: 'touch'
      })
    }
  },

  destroyed () {
    this.disposed = true
  }
}
</script>

<style lang="scss">

	.scroller {

		position: absolute;

		top: 0; left: 0; bottom: 0; right: 0;

		.scroller-body {

			position: relative;

			overflow: hidden;
		}

		.iScrollVerticalScrollbar {

			position: absolute;

			top: 0; right: 3px; bottom: 0;

			pointer-events: none;

			width: 10px;

			z-index: 99;

			.iScrollIndicator {

				position: absolute;

				top: 0; left: 0;

				width: 100%;

				background: {

					color: #ccc;
				}

				@include transform-origin( 0 0 );
			}
		}
	}

</style>
