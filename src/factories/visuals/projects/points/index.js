import Geometry from "./core/geometry";

import Material from "./core/material";

export default class Points {
  constructor(options) {
    let collection = options.collection;

    this._mesh = new THREE.Points(new Geometry({ collection }), new Material());

    this._index = 0;

    this._displ = 0;

    this._offset = 0;

    this._period = 0;

    this._amplitude = 0;

    this._first = true;
  }

  render() {
    this._mesh.material.uniforms.index.value = this._index;

    this._mesh.material.uniforms.offset.value = this._offset;

    this._mesh.material.uniforms.first.value = this._first;

    this._mesh.material.uniforms.period.value = this._period;

    this._mesh.material.uniforms.amplitude.value = this._amplitude;

    this._mesh.material.uniforms.displacement.value = this._displ;

    this._mesh.material.uniforms.time.value += 0.01;
  }

  set displ(value) {
    this._displ = value;
  }

  set first(value) {
    this._first = value;
  }

  set index(value) {
    this._index = value;
  }

  set offset(value) {
    this._offset = value;
  }

  set period(value) {
    this._period = value;
  }

  set amplitude(value) {
    this._amplitude = value;
  }

  get mesh() {
    return this._mesh;
  }
}
