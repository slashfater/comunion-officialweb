
<template>

	<div class="image" :class="config">
		
		<img :src="model.source" :width="model.width" :height="model.height" alt="" ref="image">

	</div>

</template>

<script>

	import Compo from './Compo'
	
	export default {

		name: 'ImageLeaf',

		mixins: [ Compo ],

		props: [ 'model' ],

		data () {
			
			return {

			}
		},

		mounted () {

			this.timeline = new TimelineMax( { tweens: [

				TweenMax.from( this.$refs.image, 1.5, { opacity: 0, scale: 1.2, force3D: true, ease: Cubic.easeInOut } )

				], paused: true } )
		},

		destroyed () {

			if ( this.timeline ) {

				this.timeline.kill()

				this.timeline = null
			}
		}
	}
</script>

<style lang="scss">

	section.leaf .image {
			
		position: relative;

		overflow: hidden;

		float: left;

		width: 50%;

		@media ( max-width: map-get( $sizes, custom ) - 1 ) { 
				
			width: 100%;
		}

		img {
			
			position: relative;
			
			display: block;	

			width: 100%;

			height: auto;
		}

		&.left {
			
			float: left;
		}

		&.right {

			float: right;	
		}
	}

</style>