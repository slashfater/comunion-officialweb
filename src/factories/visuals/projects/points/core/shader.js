import { Chunk } from '../../../../core/Chunk'

export default class Shader {
  constructor (options) {
    return {
      uniforms: {
        texture: { type: 't', value: null },

        index: { value: 0.0 },

        first: { value: 0.0 },

        offset: { value: 0.0 },

        period: { value: 0.0 },

        amplitude: { value: 0.0 },

        displacement: { value: 0.0 },

        time: { value: 0.0 }
      },

      vertexShader:
        `

				` +
        Chunk.define.PI +
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
				
				attribute vec3 aColor;

				attribute vec3 trs;
				attribute vec3 rot;
				attribute vec3 scl;

				attribute float uid;
				attribute float indx;
				attribute float size;

				uniform float index;
				uniform float first;
				uniform float offset;

				uniform float period;
				uniform float amplitude;

				uniform float displacement;

				uniform float time;

				varying vec3 vColor;
				varying float vShow;
				
				void main() {

					mat4 t = transform( trs, rot, scl );

					vec4 modPosition = t * vec4( position, 1.0 );

					
					vec4 wavePosition = modPosition;

					wavePosition.x = modPosition.x + amplitude * cos( ( time + uid ) * 1.0 * PI / period ) + normal.x;

					wavePosition.y = modPosition.y + amplitude * sin( ( time + uid ) * 4.0 * PI / period ) + normal.y;

					wavePosition.z = modPosition.z + amplitude * cos( ( time + uid ) * 2.0 * PI / period ) + normal.z;

					
					wavePosition.y += ( ( indx == index ? 0. : 1. ) - offset ) * 2000.;


					vec4 dispPosition = vec4( wavePosition.xyz + ( normal * displacement * ( indx == index ? 1. : 0. ) ), 1. );


					vec4 mvPosition = modelViewMatrix * dispPosition;


					float zSize = size * ( 1500. / -mvPosition.z );

					if ( zSize > 4.0 ) zSize = 4.0;
					
					float modSize = zSize * ( 1.0 + sin( 0.1 * uid + ( time * 5.0 ) ) );


					gl_PointSize = modSize;

					gl_Position = projectionMatrix * mvPosition;  


					vShow = ( indx != index && first == 1.) ? .0 : .75;

					vColor = aColor;
				}
			`,

      fragmentShader: `

				uniform sampler2D texture;

				varying vec3 vColor;
				varying float vShow;
				
				void main() {
					
					gl_FragColor = vec4( vColor, vShow );
				
					gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );

					if ( gl_FragColor.a < .1 ) discard;
				}
			`,

      // blending: THREE.MultiplyBlending,

      depthTest: true,

      transparent: true,

      vertexColors: true
    }
  }
}
