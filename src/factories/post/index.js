import Shader from "./shader";

export default class Post {
  constructor(options) {
    this._transforms = {};

    this._scene = new THREE.Scene();

    this._clock = new THREE.Clock();

    this._cameraOrtho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this._geometry = new THREE.PlaneBufferGeometry(2, 2);

    this._material = new THREE.ShaderMaterial(new Shader());

    this._mesh = new THREE.Mesh(this._geometry, this._material);

    this._scene.add(this._mesh);
  }

  /*initialize () {

		let transition = this._material.uniforms.uTransition

		this._transition = new TimelineMax( { tweens: [

			new TimelineMax( { tweens: [ 

				TweenMax.fromTo( transition.value, 1, { x: 0 }, { x: 1, ease: Cubic.easeInOut } ),
				TweenMax.fromTo( transition.value, 1, { y: 0 }, { y: 1, ease: Cubic.easeInOut } ),
				TweenMax.fromTo( transition.value, 1, { z: 0 }, { z: 1, ease: Cubic.easeInOut } ),
				TweenMax.fromTo( transition.value, 1, { w: 0 }, { w: 1, ease: Cubic.easeInOut } )

				], stagger: .12 } ) 

			], paused: true } )
			//], delay: 2, repeatDelay: 2, repeat: -1, yoyo: true, paused: true } )	
	}*/

  render() {
    let uniforms = this._material.uniforms;

    uniforms.uTime.value = Math.sin(this._clock.getElapsedTime());
  }

  transform() {
    let transforms = this._transforms,
      uniforms = this._material.uniforms;

    if (transforms) {
      uniforms.uAmount.value = transforms.post.amount;

      uniforms.uBlur.value = transforms.post.blur;

      uniforms.uRad.value = transforms.post.rad;

      uniforms.uAlpha.value = transforms.post.alpha;

      uniforms.uMask.value.y = transforms.post.maskY;

      uniforms.uMaskSize.value.y = transforms.post.maskSizeY;

      uniforms.uActiveNoise.value = transforms.post.noise ? 1 : 0;

      uniforms.uActiveClouds.value = transforms.post.clouds ? 1 : 0;

      uniforms.uActiveTransition.value = 1;
    }
  }

  set dir(value) {
    this._material.uniforms.uDir.value = value;
  }

  set width(value) {
    this._material.uniforms.uResolution.value.x = value;

    this._material.uniforms.uDocument.value.x = window.innerWidth;
  }

  set height(value) {
    this._material.uniforms.uResolution.value.y = value;

    this._material.uniforms.uDocument.value.y = window.innerHeight;
  }

  set sampler(value) {
    this._material.uniforms.uSampler.value = value;
  }

  set samplerIn(value) {
    this._material.uniforms.uSamplerIn.value = value;
  }

  set samplerOut(value) {
    this._material.uniforms.uSamplerOut.value = value;
  }

  set transforms(value) {
    this._transforms = value;

    this.transform();
  }

  get transition() {
    return this._material.uniforms.uTransition;
  }

  get camera() {
    return this._cameraOrtho;
  }

  get scene() {
    return this._scene;
  }
}
