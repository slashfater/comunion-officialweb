import Shader from "./shader";

export default class Material {
  constructor(options) {
    let material = new THREE.ShaderMaterial(new Shader()),
      envmap = new THREE.TextureLoader().load("img/assets/envmap.jpg");

    //envmap.wrapT = THREE.RepeatWrapping

    envmap.mapping = THREE.SphericalReflectionMapping;

    material.uniforms.envMap.value = envmap;

    material.extensions.derivatives = true;

    return material;
  }
}
