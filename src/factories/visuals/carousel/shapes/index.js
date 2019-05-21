import Geometry from './core/geometry'

import Material from './core/material'

export default class Shapes {
  constructor (options) {
    let collection = options.collection

    this._mesh = new THREE.Mesh(new Geometry({ collection }), new Material())

    this._radius = 0

    this._angle = 0
  }

  render () {
    this._mesh.material.uniforms.radius.value = this._radius

    this._mesh.material.uniforms.angle.value = this._angle

    this._mesh.material.uniforms.time.value += 0.01
  }

  set radius (value) {
    this._radius = value
  }

  set angle (value) {
    this._angle = value
  }

  get mesh () {
    return this._mesh
  }
}
