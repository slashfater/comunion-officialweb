<template>

	<div id='gui'>{{ }}</div>

</template>

<script>

import { mapState, mapActions } from 'vuex'

import { States, Actions, Events } from '../../constants'

import Commons from '../mixins/Commons'

export default {

  name: 'Gui',

  mixins: [ Commons ],

  data () {
    return {

      routes: {

        home: {

          goToHome: () => { },

          goToWho: () => { },

          goToVision: () => { },

          goToMission: () => { },

          goToProjects: () => { }
        },

        projects: {

          gotoProject: () => { }
        },

        goToPartners: () => { },

        goToContact: () => { }
      },

      canvas: {

        scene: {

          radius: 2.5,

          burst: 1.75,

          amplitude: 12,

          period: 5,

          displ: 10
        },

        camera: {

          dist: 2350,

          far: 3600
        },

        post: {

          noise: true,

          clouds: true,

          amount: 0.09,

          alpha: 0.11,

          blur: 0.12,

          rad: 1
        }
      }
    }
  },

  computed: mapState({

    slider: state => state.site.collections.slider
  }),

  methods: {

    ...mapActions([

      Actions.OPEN_MENU,

      Actions.CLOSE_MENU,

      Actions.INVERSE ]),

    dispatch (value) {
      this.$bus.emit(Events.TRANSFORM, this.canvas)
    }
  },

  mounted () {
    let gui = new dat.GUI()

    let slider = this.slider

    let router = this.$router

    let site = gui.addFolder('Site')

    let routes = site.addFolder('Routes')

    let home = routes.addFolder('Home')

    home.add(this.routes.home, 'goToHome').name('Go To Home').onChange(value => this.navigateTo(States.SLIDER, { slide: slider[0].name }))

    home.add(this.routes.home, 'goToWho').name('Go To Who').onChange(value => { this.navigateTo(States.SLIDER, { slide: slider[1].name }) })

    home.add(this.routes.home, 'goToVision').name('Go To Vision').onChange(value => { this.navigateTo(States.SLIDER, { slide: slider[2].name }) })

    home.add(this.routes.home, 'goToMission').name('Go To Mission').onChange(value => { this.navigateTo(States.SLIDER, { slide: slider[3].name }) })

    home.add(this.routes.home, 'goToProjects').name('Go To Projects').onChange(value => { this.navigateTo(States.SLIDER, { slide: slider[4].name }) })

    home.open()

    let projects = routes.addFolder('Projects')

    projects.add(this.routes.projects, 'gotoProject').name('Go To Project').onChange(value => { this.navigateTo(States.LEAF, { leaf: 'the-gate' }) })

    projects.open()

    routes.add(this.routes, 'goToPartners').name('Go To Partners').onChange(value => { this.navigateTo(States.PARTNERS) })

    routes.add(this.routes, 'goToContact').name('Go To Contact').onChange(value => { this.navigateTo(States.CONTACTS) })

    // routes.open()

    let canvas = site.addFolder('Canvas')

    let scene = canvas.addFolder('Scene')

    scene.add(this.canvas.scene, 'radius', 0, 5, 0.001).name('Radius').onChange(this.dispatch)

    scene.add(this.canvas.scene, 'burst', 0, 5, 0.001).name('Burst').onChange(this.dispatch)

    scene.add(this.canvas.scene, 'amplitude', 0, 100, 1).name('Amplitude').onChange(this.dispatch)

    scene.add(this.canvas.scene, 'period', 0, 10, 0.01).name('Period').onChange(this.dispatch)

    scene.add(this.canvas.scene, 'displ', 0, 300, 0.1).name('Displ').onChange(this.dispatch)

    let camera = canvas.addFolder('Camera')

    camera.add(this.canvas.camera, 'dist', 100, 3000, 1).name('Distance').onChange(this.dispatch)

    camera.add(this.canvas.camera, 'far', 2000, 5000, 1).name('Far').onChange(this.dispatch)

    let post = canvas.addFolder('Post')

    post.add(this.canvas.post, 'rad', 0, 1, 0.001).name('Cloud Rad').onChange(this.dispatch)

    post.add(this.canvas.post, 'blur', 0, 1, 0.001).name('Cloud Blur').onChange(this.dispatch)

    post.add(this.canvas.post, 'alpha', 0, 1, 0.001).name('Cloud Alpha').onChange(this.dispatch)

    post.add(this.canvas.post, 'amount', 0, 1, 0.001).name('Noise Amount').onChange(this.dispatch)

    post.add(this.canvas.post, 'noise').name('Noise Active').onChange(this.dispatch)

    post.add(this.canvas.post, 'clouds').name('Clouds Active').onChange(this.dispatch)

    canvas.open()

    this.$bus.emit(Events.TRANSFORM, this.canvas)

    gui.updateDisplay()

    gui.close()

    this.gui = gui
  }
}
</script>

<style lang="scss">

	.dg.ac {

		z-index: 99 !important;
	}

</style>
