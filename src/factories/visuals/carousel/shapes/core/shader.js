import { Chunk } from '../../../../core/Chunk'

export default class Shader {
  constructor (options) {
    return {
      uniforms: THREE.UniformsUtils.merge([
        THREE.ShaderLib['phong'].uniforms,
        {
          color: { value: new THREE.Color(0x000000) },

          emissive: { value: new THREE.Color(0xffffff).multiplyScalar(0.15) },

          envMap: { type: 't', value: null },

          radius: { value: 2.0 },

          angle: { value: 0.0 },

          time: { value: 0.0 }
        }
      ]),

      vertexShader:
        `

				` +
        Chunk.mats.phong.vs.defs +
        `

				` +
        Chunk.math.scale +
        `
				
				` +
        Chunk.math.rotate +
        `
				
				` +
        Chunk.math.translate +
        `
				
				` +
        Chunk.math.transform +
        `

				attribute vec3 trs;
				attribute vec3 rot;
				attribute vec3 scl;

				attribute float uid;
				attribute float f;

				uniform float radius;
				uniform float angle;
				uniform float time;

				uniform vec3 color;

				void main() {

					` +
        Chunk.mats.phong.vs.head +
        `

					
					mat4 t = transform( trs * vec3( radius ), rot, scl );

					vec4 modPosition = t * vec4( transformed, 1.0 );

					modPosition *= rotate( vec3( 0.0, PI / 2.0, ( PI / 2.0 + 1.2566370614359172 - angle ) * f ) );

					modPosition.y -= 1000.0 * radius;


					float period = 5.;
					float amplitude = .75;

					modPosition.x = modPosition.x + amplitude * cos( ( time + uid ) * 2.0 * PI / period );
					modPosition.y = modPosition.y + amplitude * sin( ( time + uid ) * 1.0 * PI / period );
					

					transformed = modPosition.xyz;


					` +
        Chunk.mats.phong.vs.foo +
        `
				}`,

      fragmentShader:
        `
				
				` +
        Chunk.mats.phong.fs.defs +
        `
				
				void main() {

					` +
        Chunk.mats.phong.fs.head +
        `

					
					vec4 color = vec4( outgoingLight, diffuseColor.a );
					
					gl_FragColor = color;

					
					` +
        Chunk.mats.phong.fs.foo +
        `
				}`,

      transparent: true,

      lights: true,

      fog: true
    }
  }
}
