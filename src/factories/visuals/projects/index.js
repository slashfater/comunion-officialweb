import { States } from '../../../constants'

import Visual from '../../core/Visual'

import Points from './points/'

import models from '../../../models'

import meta from '../../../meta'

export default class Projects extends Visual {
  constructor (options) {
    super(options)

    let collection = models.prjs

    this._points = new Points({ collection })

    this._scene.add(this._points.mesh)

    this._adjusting = false

    this._displacement = 0

    this._offset = 0

    this._index = 0
  }

  render () {
    super.render()

    this._points.render()

    if (!this._adjusting) {
      this.displacement += (meta.scrollTop / 2 - this.displacement) * 0.065
    }
  }

  slide () {
    let from = meta.route.from
    let route = from ? from.name : ''

    this._points.index = this._index

    this._points.first = route != States.LEAF ? 1 : 0

    this._timeline = new TimelineMax({
      tweens: [
        TweenMax.fromTo(
          this,
          2.5,
          { offset: 1 },
          { offset: 0, ease: Expo.easeInOut }
        )
      ]
    })
  }

  offsetUpdate () {
    this._points.offset = this._offset
  }

  adjust (step) {
    this._adjusting = true

    let duration = meta.scrollontop ? 0 : 2

    TweenMax.to(this, duration, {
      displacement: 0,
      ease: Expo.easeInOut,
      onUpdate: () => {
        step.call(null)
      },
      onComplete: () => {
        this._adjusting = false
      }
    })
  }

  displacementUpdate () {
    this._points.displ = this._displacement
  }

  transform () {
    super.transform()

    let transforms = this._transforms
    let shapes = this._shapes
    let points = this._points

    if (transforms) {
      points.period = 5 // transforms.scene.period // 5

      points.amplitude = 2 // transforms.scene.amplitude // 12
    }
  }

  set index (value) {
    this._index = value

    this.slide()
  }

  set displacement (value) {
    this._displacement = value

    this.displacementUpdate()
  }

  get displacement () {
    return this._displacement
  }

  set offset (value) {
    this._offset = value

    this.offsetUpdate()
  }

  get offset () {
    return this._offset
  }
}
