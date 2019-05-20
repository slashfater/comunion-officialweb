
<template>

	<div id="app-stage">
		
		<canvas ref="canvas"></canvas>

	</div>

</template>

<script>
	
	import { mapState } from 'vuex'

	import { States, Actions, Events, Sizes } from '../../constants'

	import Carousel from '../../factories/visuals/carousel'

	import Projects from '../../factories/visuals/projects'

	import Sample from '../../factories/visuals/sample'

	import Post from '../../factories/post'

	import Commons from '../mixins/Commons'

	import meta from '../../meta'

	export default {

		name: 'AppStage',

		mixins: [ Commons ],

		data () {
	
			return {

				visuals: [],

				dragvalue: 0,

				timeline: null,

				postactive: true,

				transforms: {},

				prev: -1,

				next: 0
			}
		},

		watch: {

			$route ( to, from ) {

				this.update( to, from )
			}
		},

		methods: {

			initialize () {

				let canvas = this.$refs.canvas,

					dpr = 1 //window.devicePixelRatio || 1


				this.renderer = new THREE.WebGLRenderer( { canvas, alpha: true, antialias: true } )

				this.renderer.setClearColor( 0x000000, 0 )

				this.renderer.setSize( 1280, 720 )

				this.renderer.setPixelRatio( dpr )


				this.camera = new THREE.PerspectiveCamera( 40, 1280 / 720, 1, 100000 )
	
				this.camera.position.set( 0, 0, 2000 )

				this.camera.lookAt( new THREE.Vector3() )


				this.zero = new THREE.Vector3()


				this.raycaster = new THREE.Raycaster()


				//this.controls = new THREE.OrbitControls( this.camera, document ) // this.renderer.domElement

				//this.controls.enabled = false


				this.visuals = [

					new Carousel( { camera: this.camera, color: 0x0c0c0c, dpr } ),

					new Projects( { camera: this.camera, color: 0xffffff, dpr } ),
					
					new Sample( { camera: this.camera, color: 0xff7200, dpr } ),
					
					new Sample( { camera: this.camera, color: 0x181818, dpr } ),

					new Sample( { camera: this.camera, color: 0xcccccc, dpr } ) ]

				
				this.post = new Post()


				this.resize()

				this.update()
			},

			render () {

				if ( !this.renderer ) return


				this.camera.position.x += ( ( this.$swiper.mouse.x * .5 ) - this.camera.position.x ) * .05
				
				this.camera.position.y += ( - ( this.$swiper.mouse.y * .5 ) - this.camera.position.y ) * .05

				this.camera.lookAt( this.zero )
			

				let progress = this.timeline ? this.timeline.progress() : 0

				if ( progress > 0 && progress < 1 && this.prev > -1 )

					this.renderVisual( this.prev )

				this.renderVisual( this.next )


				this.renderer.render( this.post.scene, this.post.camera, null, true )

				this.post.render()
			},

			renderVisual( index ) {

				let camera = this.camera,

					renderer = this.renderer,

					visual = this.visuals[ index ]


				visual.render()

				renderer.setClearColor( visual.color )

				renderer.render( visual.scene, visual.camera, visual.fbo, true )
			},

			update ( to, from ) {

				let delay = meta.scrollontop ? 0 : 2,

					name = to ? to.name : this.$route.name

				this.prev = from ? this.tree.indexOfName( this.normalize( from.name ) ) : -1,

				this.next = this.tree.indexOfName( this.normalize( name ) )


				meta.route = { to, from }


				if ( this.sid > -1 )

					TweenMax.delayedCall( delay, () => this.visuals[0].index = this.sid )

				if ( this.lid > -1 )

					TweenMax.delayedCall( delay, () => this.visuals[1].index = this.lid )
				

				if ( this.prev < 0 ) {

					this.post.samplerOut = null

					this.post.samplerIn = this.visuals[ this.next ].fbo.texture

					TweenMax.set( this.post.transition.value, { x: 1, y: 1, z: 1, w: 1 } )
				
				} else {

					this.post.samplerOut = this.visuals[ this.prev ].fbo.texture

					this.post.samplerIn = this.visuals[ this.next ].fbo.texture

					
					if ( this.timeline )

						this.timeline.kill()

					this.timeline = new TimelineMax( { tweens: [ 

						TweenMax.fromTo( this.post.transition.value, 1, { x: 0 }, { x: 1, ease: Cubic.easeInOut } ),
						TweenMax.fromTo( this.post.transition.value, 1, { y: 0 }, { y: 1, ease: Cubic.easeInOut } ),
						TweenMax.fromTo( this.post.transition.value, 1, { z: 0 }, { z: 1, ease: Cubic.easeInOut } ),
						TweenMax.fromTo( this.post.transition.value, 1, { w: 0 }, { w: 1, ease: Cubic.easeInOut } )

					], stagger: .12, delay } )
				}
			},

			adjustLeaf () {

				this.visuals[ 1 ].adjust( () => {

					if ( this.prev > -1 && this.prev != this.next ) 

						this.renderVisual( this.prev )
				} )
			},

			drag ( event ) {

				let sid = this.sid,

					current = this.current,

					visual = this.visuals[ current ],

					move = this.dragvalue - event.dist.y


				if ( sid > -1 ) {

					if ( visual.timeline )

						visual.timeline.kill()

					visual.angle += move * .0005
				
				} else {

					//console.log( '::drag visual::' )
				}

				
				this.dragvalue = event.dist.y
			},

			drop ( event ) {

				let dir = event.dir,

					leave = event.leave,

					length = this.slider.length - 1,

					sid = this.sid


				if ( ( sid == 0 && dir < 0 ) ||

					 ( sid == length && dir > 0 ) || 

				 	 !leave ) this.visuals[0].slide()


				this.dragvalue = 0
			},

			transform ( transforms ) {

				this.transforms = transforms

				this.postactive = transforms.post.clouds || transforms.post.noise


				if ( this.post )

					this.post.transforms = transforms


				for ( let visual of this.visuals ) {

					visual.transforms = transforms
				}


				if ( this.camera ) {

					let deskscreen = window.innerWidth > Sizes.CUSTOM - 1

					this.camera.position.z = deskscreen ? transforms.camera.dist : 3000

					this.camera.far = deskscreen ? transforms.camera.far : 4500

					this.camera.updateProjectionMatrix()
				}
			},

			resize () {
				
				if ( !this.renderer ) return


				let width = window.innerWidth,

					height = window.innerHeight

				
				this.renderer.setSize( width, height )
				
				this.camera.aspect = width / height

				this.camera.updateProjectionMatrix()

				
				this.post.width = this.renderer.domElement.width

				this.post.height = this.renderer.domElement.height
			}
		},

		mounted () {

			this.initialize()


			this.$ticker.add( this.render )

			this.$swiper.bus.on( Events.DRAG, this.drag )

			this.$swiper.bus.on( Events.DROP, this.drop )

			this.$resizer.bus.on( Events.RESIZE, this.resize )


			this.$bus.on( Events.LEAF_LEAVE, this.adjustLeaf )

			this.$bus.on( Events.TRANSFORM, this.transform )
		}
	}

</script>

<style lang="scss">

	#app-stage {

		position: absolute;

		top: 0; left: 0; bottom: 0; right: 0;

		overflow: hidden;

		z-index: 1;
		
		canvas {
	
			position: relative;

			width: 100% !important; 

			height: 100% !important;

			background: transparent;

			z-index: 1;
		}
	}

</style>