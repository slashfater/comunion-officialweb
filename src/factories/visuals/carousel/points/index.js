import Geometry from './core/geometry'

import Material from './core/material'

export default class Points {
  constructor (options) {
    let collection = options.collection

    this._mesh = new THREE.Points(new Geometry({ collection }), new Material())

    this._angle = 0

    this._offset = 0

    this._radius = 0

    this._displ = 0

    this._burst = 0

    this._period = 0

    this._amplitude = 0
  }

  render () {
    this._mesh.material.uniforms.angle.value = this._angle

    this._mesh.material.uniforms.tscale.value = 160 - 160 * this._offset

    this._mesh.material.uniforms.freq.value =
      -Math.PI / 2 + (Math.PI / 2) * this._offset

    this._mesh.material.uniforms.radius.value = this._radius

    this._mesh.material.uniforms.displ.value = this._displ

    this._mesh.material.uniforms.burst.value = this._burst

    this._mesh.material.uniforms.period.value = this._period

    this._mesh.material.uniforms.amplitude.value = this._amplitude

    this._mesh.material.uniforms.time.value += 0.01
  }

  set radius (value) {
    this._radius = value
  }

  set displ (value) {
    this._displ = value
  }

  set burst (value) {
    this._burst = value
  }

  set period (value) {
    this._period = value
  }

  set amplitude (value) {
    this._amplitude = value
  }

  set offset (value) {
    this._offset = value
  }

  set angle (value) {
    this._angle = value
  }

  get mesh () {
    return this._mesh
  }
}
