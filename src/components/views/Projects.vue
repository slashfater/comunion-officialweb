
<template>
	
	<transition 

    	@enter="enter" 
    	
    	@leave="leave"

    	:css="false">

		<section id="projects" class="root">

			<router-view :key="leaf" :model="model" ref="leaf"></router-view>

			<leaf-nav 
				
				ref="leafNav"

				:prev="prev" 

				:next="next" 

				:prevCount="prevCount" 

				:nextCount="nextCount"

				:prevActive="prevActive"

				:nextActive="nextActive">
					
			</leaf-nav>

		</section>

	</transition>

</template>

<script>
	
	import { mapState } from 'vuex'

	import { States} from '../../constants'

	import Commons from '../mixins/Commons'

	import Section from '../mixins/Section'

	import Nav from '../leaf/Nav.vue'
	
	export default {

		name: 'Projects',

		mixins: [ Section, Commons ],

		data () {
	
			return {

			}
		},

		computed: {

			...mapState( {

				collection: state => state.site.projects
			} ),

			model () { return this.collection ? this.collection.filter( l => l.route == this.leaf )[0] : null },

			prevCount () { let count = this.lid; return this.getCount( --count, this.collection ) },

			nextCount () { let count = this.lid; return this.getCount( ++count, this.collection ) },

			lid () { return this.collection ? this.collection.indexOfName( this.leaf ) : 0 },

			nextActive () { return this.lid + 1 < ( this.collection ? this.collection.length : 9999 ) },

			prevActive () { return this.lid - 1 > -1 },

			leaf () { return this.$route.params.leaf }
		},

		components: {

			'leaf-nav': Nav
		},

		methods: {

			prev () {

				let lid = this.lid,

					leaf = this.getLeaf( --lid, this.collection )
				
				this.navigateTo( States.LEAF, { leaf: leaf.route } )
			},

			next () {

				let lid = this.lid,

					leaf = this.getLeaf( ++lid, this.collection )
				
				this.navigateTo( States.LEAF, { leaf: leaf.route } )
			},

			getLeaf ( id, collection ) {

				let length = collection.length - 1

				if ( id > length ) id = length

				if ( id < 0 ) id = 0

				return collection[ id ]
			},

			getCount ( count, collection ) {

				let length = collection ? collection.length - 1 : 0

				if ( count < 0 || count > length ) count = -1

				let label = count < 0 ? '' : count < 10 ? '0' + ( count + 1 ) : count + 1

				return label
			},

			leave ( el, done ) {

				return new TimelineMax( { tweens: [

					this.$refs.leafNav.leave(),

					this.$refs.leaf.leave()

					], onComplete: done } )
			},

			enter ( el, done ) {

				return new TimelineMax( { tweens: [

					this.$refs.leafNav.enter(),

					this.$refs.leaf.enter()

					], onComplete: done } )
			}
		}
	}
</script>

<style lang="scss">

</style>