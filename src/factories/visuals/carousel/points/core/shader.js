import { Chunk } from "../../../../core/Chunk";

export default class Shader {
  constructor(options) {
    return {
      uniforms: {
        texture: { type: "t", value: null },

        angle: { value: 0.0 },

        tscale: { value: 0.0 },

        freq: { value: 0.0 },

        radius: { value: 2.0 },

        displ: { value: 0.0 },

        burst: { value: 0.0 },

        period: { value: 0.0 },

        amplitude: { value: 0.0 },

        time: { value: 0.0 },

        speed: { value: 0.0 }
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
				attribute float size;
				attribute float alpha;

				attribute float f;
				attribute float d;
				attribute float b;

				uniform float angle;
				uniform float tscale;
				uniform float freq;
				
				uniform float radius;
				uniform float displ;
				uniform float burst;
				uniform float period;
				uniform float amplitude;

				uniform float time;
				uniform float speed;

				varying vec3 vColor;
				varying float opacity;

				void main() {
					
					mat4 t = transform( trs * vec3( radius * f ), rot, scl );

					vec4 modPosition = t * vec4( position, 1.0 );


					vec4 wavePosition = modPosition;

					wavePosition.x = modPosition.x + amplitude * f * cos( ( time + uid ) * 1.0 * PI / period ) + normal.x * ( ( displ * d ) + ( burst * b ) );

					wavePosition.y = modPosition.y + amplitude * f * sin( ( time + uid ) * 4.0 * PI / period ) + normal.y * ( ( displ * d ) + ( burst * b ) );

					wavePosition.z = modPosition.z + amplitude * f * cos( ( time + uid ) * 2.0 * PI / period ) + normal.z * ( ( displ * d ) + ( burst * b ) );

			
					float dist = distance( vec3( 1000.0, 0.0, 0.0 ), wavePosition.xyz ) / 300.0;

					float value = tscale * sin( time * speed + dist * freq );

					wavePosition.x -= value * ( abs( 1.0 - f ) );


					wavePosition *= rotate( vec3( 0.0, PI / 2.0, ( PI / 2.0 + 1.2566370614359172 - angle ) * f ) );

					wavePosition.y -= 1000.0 * radius * f;

					
					vec4 mvPosition = modelViewMatrix * wavePosition;


					float zSize = size * ( 1500. / -mvPosition.z );

					if ( zSize > 4.0 ) zSize = 4.0;
					
					float modSize = f == 0.0 ? zSize : zSize * ( 1.0 + sin( 0.1 * uid + ( time * 5.0 ) ) );
					
					
					gl_PointSize = modSize;

					gl_Position = projectionMatrix * mvPosition;


					vColor = aColor;

					opacity = alpha;
				}	
			`,

      fragmentShader: `
				
				uniform sampler2D texture;

				varying float opacity;
				varying vec3 vColor;
				
				void main() {

					gl_FragColor = vec4( vColor, opacity );
				
					gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );

					if ( gl_FragColor.a < .1 ) discard;
				}
			`,

      blending: THREE.AdditiveBlending,

      depthTest: true,

      transparent: true,

      vertexColors: true
    };
  }
}
