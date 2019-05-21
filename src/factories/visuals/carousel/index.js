import Visual from '../../core/Visual'

import Shapes from './shapes/'

import Points from './points/'

import models from '../../../models'

export default class Carousel extends Visual {
  constructor (options) {
    super(options)

    let collection = models.fbxs

    this._shapes = new Shapes({ collection })

    this._points = new Points({ collection })

    this._scene.fog = new THREE.FogExp2(0x000000, 0.0)

    this._scene.add(this._shapes.mesh)

    this._scene.add(this._points.mesh)

    this._slice = (Math.PI * 2) / (collection.length + 1)

    this._collection = collection

    this._timeline = null

    this._angle = 0

    this._index = 0

    this._dest = 0
  }

  render () {
    super.render()

    this._shapes.render()

    this._points.render()
  }

  slide () {
    let angle = this._slice * this._index
    if (angle < 0) angle = 0

    let duration = THREE.Math.clamp(Math.abs(this._dest - angle), 1.5, 4.5)

    this._dest = angle

    this._timeline = new TimelineMax({
      tweens: [
        TweenMax.to(this, duration, { angle: angle, ease: Cubic.easeOut })
      ]
    })
  }

  update () {
    let dest = this._dest
    let angle = this._angle
    let offset = 1 - Math.abs(dest - angle)

    this._shapes.angle = angle

    this._points.angle = angle

    this._points.offset = offset
  }

  transform () {
    super.transform()

    let transforms = this._transforms
    let shapes = this._shapes
    let points = this._points

    if (transforms) {
      shapes.radius = transforms.scene.radius

      points.radius = transforms.scene.radius

      points.displ = transforms.scene.displ

      points.burst = transforms.scene.burst

      points.period = transforms.scene.period

      points.amplitude = transforms.scene.amplitude
    }
  }

  set index (value) {
    this._index = value

    this.slide()
  }

  set angle (value) {
    this._angle = value

    this.update()
  }

  get timeline () {
    return this._timeline
  }

  get angle () {
    return this._angle
  }
}
