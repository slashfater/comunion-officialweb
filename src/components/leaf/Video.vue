
<template>

	<div class="video" :class="config">

		<img :src="assets['poster'].src" :width="model.width" :height="model.height" alt="" :style="{ 'max-width': model['max-width']+'px' }">
			
		<!--video controls preload="auto" :width="model.width" :height="model.height" :style="{ 'max-width': model['max-width']+'px' }" ref="video">
			<source :src="model.source" type="video/mp4">
		</video-->
		
		<div class="holder" ref="video">
			<div id="youtube" ref="yt"></div>
		</div>

	</div>

</template>

<script>
	
	import { mapState } from 'vuex'

	import { Events } from '../../constants'

	import Compo from './Compo'
	
	export default {

		name: 'VideoLeaf',

		mixins: [ Compo ],

		props: [ 'model' ],

		data () {
		
			return {

				ready: false
			}
		},

		computed: mapState( {

			assets: state => state.site.assets
		} ),

		methods: {

			setup () {

				this.player = new YT.Player( this.$refs.yt, {

					width: this.model.width,
					
					height: this.model.height,
					
					videoId: this.model.ytvid,

					playerVars: { 

						'playsinline': 0,

						'controls': 0,
						
						'showinfo': 0,

						'autoplay': 0,

						'loop': 0,

						'rel' : 0
					},

					events: {

						'onReady': this.onPlayerReady,

						'onStateChange': this.onPlayerStateChange
					}
				} )
			},

			onPlayerReady ( event ) {

				this.ready = true
			},

			onPlayerStateChange ( event ) {

				switch ( event.data ) {

					case YT.PlayerState.UNSTARTED :
						
						console.log( ':: UNSTARTED ::' )

						break

					case YT.PlayerState.ENDED :
						
						console.log( ':: ENDED ::' )

						this.$mixer.resume()

						break

					case YT.PlayerState.PLAYING :

						console.log( ':: PLAYING ::' )

						this.$mixer.quiet()

						break

					case YT.PlayerState.PAUSED :

						console.log( ':: PAUSED ::' )

						this.$mixer.resume()

						break

					case YT.PlayerState.BUFFERING :

						console.log( ':: BUFFERING ::' )

						break
				}
			},

			leave () {

				if ( this.player )

					this.player.stopVideo()

				if ( this.timeline ) 

					this.timeline.reverse()
			}
		},

		created () {

			this.$bus.on( Events.LEAF_READY, this.setup )
		},	

		mounted () {
			
			this.timeline = new TimelineMax( { tweens: [

				TweenMax.from( this.$refs.video, 1, { y: '115%', scale: 1.2, force3D: false, ease: Cubic.easeInOut } )

				], paused: true } )
		},

		destroyed () {

			this.$bus.off( Events.LEAF_READY, this.setup )

			this.$mixer.resume()

			if ( this.timeline ) {

				this.timeline.kill()

				this.timeline = null
			}

			if ( this.player ) {

				this.player.destroy()

				this.player = null
			}
		}
	}
</script>

<style lang="scss">

	section.leaf .video {

		position: relative;

		overflow: hidden;

		float: left;
		
		video, iframe, .holder {
			
			position: absolute;

			top: 0; left: 0;

			width: 100%; height: 100%;

			display: block;	

			z-index: 2;
		}

		img {

			position: relative;
			
			width: 100%; height: auto;

			display: block;

			z-index: 1;
		}

		&.left {
			
			float: left;
		}

		&.right {

			float: right;	
		}
	}

</style>