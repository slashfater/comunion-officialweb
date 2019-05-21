export default class Visual {
  constructor (options) {
    this._dpr = options.dpr

    this._color = options.color

    this._camera = options.camera

    this._scene = new THREE.Scene()

    this._renderTargetParameters = {
      minFilter: THREE.LinearFilter,

      magFilter: THREE.LinearFilter,

      format: THREE.RGBFormat,

      stencilBuffer: false
    }

    this._fbo = new THREE.WebGLRenderTarget(
      window.innerWidth * this._dpr,
      window.innerHeight * this._dpr,
      this._renderTargetParameters
    )
  }

  render () {

  }

  transform () {

  }

  set transforms (value) {
    this._transforms = value

    this.transform()
  }

  get camera () {
    return this._camera
  }

  get scene () {
    return this._scene
  }

  get color () {
    return this._color
  }

  get fbo () {
    return this._fbo
  }
}
