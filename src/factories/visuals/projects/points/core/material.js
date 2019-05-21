import Shader from './shader'

export default class Material {
  constructor (options) {
    let material = new THREE.ShaderMaterial(new Shader())
    let sprite = new THREE.TextureLoader().load('img/assets/spark.png')

    material.uniforms.texture.value = sprite

    return material
  }
}
