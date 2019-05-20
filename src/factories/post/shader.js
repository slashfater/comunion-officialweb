import { Chunk } from "../core/Chunk";

export default class Shader {
  constructor(options) {
    return {
      uniforms: {
        uResolution: { type: "v2", value: new THREE.Vector2() },

        uCol: { type: "v3", value: new THREE.Color(0x42d1d3) },

        uTransition: { type: "v4", value: new THREE.Vector4() },

        uDocument: { type: "v2", value: new THREE.Vector2() },

        uMaskSize: { type: "v2", value: new THREE.Vector2() },

        uMask: { type: "v2", value: new THREE.Vector2() },

        uActiveTransition: { type: "f", value: null },

        uActiveClouds: { type: "f", value: null },

        uActiveNoise: { type: "f", value: null },

        uSamplerOut: { type: "t", value: null },

        uSamplerIn: { type: "t", value: null },

        uSampler: { type: "t", value: null },

        uAmount: { type: "f", value: 0.2 },

        uAlpha: { type: "f", value: 0.2 },

        uTime: { type: "f", value: 0.2 },

        uBlur: { type: "f", value: 0.0 },

        uRad: { type: "f", value: 0.0 },

        uDir: { type: "f", value: 1.0 }
      },

      vertexShader: `

				precision highp float;

				varying vec2 vUv;

				void main() {
					
					vUv = vec2( uv.x, uv.y );

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}
			`,

      fragmentShader:
        `
				
				` +
        Chunk.precision.highp +
        `

				` +
        Chunk.define.PI +
        `
				
				` +
        Chunk.math.random2d +
        `

				` +
        Chunk.shapes.circle +
        `

				` +
        Chunk.shapes.rect +
        `

				
				uniform sampler2D uSamplerOut;
				
				uniform sampler2D uSamplerIn;

				uniform sampler2D uSampler;

				uniform float uActiveTransition;

				uniform float uActiveClouds;

				uniform float uActiveNoise;

				uniform vec2 uResolution;

				uniform vec4 uTransition;
				
				uniform vec2 uDocument;
				
				uniform vec2 uMaskSize;

				uniform float uAmount;

				uniform float uAlpha;

				uniform float uBlur;
				
				uniform float uTime;
				
				uniform vec2 uMask;
				
				uniform float uRad;

				uniform float uDir;

				uniform vec3 uCol;

				
				varying vec2 vUv;

				
				void main() {

					vec2 uv2 = -1.0 + 2.0 * gl_FragCoord.xy / uResolution.xy;

					uv2.x *= uResolution.x / uResolution.y;


					bool deskscreen = uResolution.x > 979.;

					vec4 visualIn = texture2D( uSamplerIn, vUv );

					vec4 visualOut = texture2D( uSamplerOut, vUv );

					vec4 visual = texture2D( uSampler, vUv );
					

					vec2 coord = vec2( 0. );


					if ( uActiveClouds == 1. && deskscreen ) {
						
						float amplitude = 0.;
						float period = 10.;

						amplitude = .25;
						coord = vec2( .75, -.65 );
						coord.x = coord.x + amplitude * cos( ( uTime ) * 1.0 * PI / period );
						coord.y = coord.y + amplitude * sin( ( uTime ) * 2.0 * PI / period );
						visualIn.rgb += circle( uCol, uRad * 1.35, uBlur, coord, uv2 ) * ( uAlpha * 1.35 );
						visualOut.rgb += circle( uCol, uRad * 1.35, uBlur, coord, uv2 ) * ( uAlpha * 1.35 );

						amplitude = .15;
						coord = vec2( -.5, -1.25 );
						coord.x = coord.x - amplitude * cos( ( uTime ) * 2.0 * PI / period );
						coord.y = coord.y - amplitude * sin( ( uTime ) * 1.0 * PI / period );
						visualIn.rgb += circle( uCol, uRad * 1.35, uBlur, coord, uv2 ) * ( uAlpha * 1.25 );
						visualOut.rgb += circle( uCol, uRad * 1.35, uBlur, coord, uv2 ) * ( uAlpha * 1.25 );

						amplitude = -.125;
						coord = vec2( -1.5, 1.15 );
						coord.x = coord.x + amplitude * cos( ( uTime ) * 1.0 * PI / period );
						coord.y = coord.y + amplitude * sin( ( uTime ) * 2.0 * PI / period );
						visualIn.rgb += circle( uCol, uRad * 2., uBlur, coord, uv2 ) * ( uAlpha * 1. );
						visualOut.rgb += circle( uCol, uRad * 2., uBlur, coord, uv2 ) * ( uAlpha * 1. );
					}

					
					vec3 mask = vec3( 0. );

					if ( uActiveTransition == 1. ) {

						vec3 col = vec3( 1. );
						vec2 msize = vec2( 1. );

						if ( deskscreen ) {

							float colw = 91.;
							
							msize.x = colw / uDocument.x;
							msize.y = uTransition.x;
							coord.x = vUv.x + .5 - msize.x / 2. + .001;
							coord.y = vUv.y + .5 * ( 1. - uTransition.x ) * uDir;
							col = vec3( rect( coord, msize ) );
							mask += col;

							msize.x = colw / uDocument.x;
							msize.y = uTransition.y;
							coord.x = vUv.x - .5 + msize.x / 2. - .001;
							coord.y = vUv.y + .5 * ( 1. - uTransition.y ) * uDir;
							col = vec3( rect( coord, msize ) );
							mask += col;

							msize.x = ( uDocument.x / 2. ) / uDocument.x;
							msize.y = uTransition.z;
							coord.x = vUv.x + msize.x / 2. - .001;
							coord.y = vUv.y + .5 * ( 1. - uTransition.z ) * uDir;
							col = vec3( rect( coord, msize ) );
							mask += col;

							msize.x = ( uDocument.x / 2. ) / uDocument.x;
							msize.y = uTransition.w ;
							coord.x = vUv.x - msize.x / 2. + .001;
							coord.y = vUv.y + .5 * ( 1. - uTransition.w ) * uDir;
							col = vec3( rect( coord, msize ) );
							mask += col;
						
						} else {

							float side = uDocument.x;
							
							msize.x = side / uDocument.x;
							msize.y = uTransition.z;
							coord.x = vUv.x + .5 - .001;
							coord.y = vUv.y + .5 * ( 1. - uTransition.z ) * uDir;
							col = vec3( rect( coord, msize ) );
							mask += col;

							msize.x = side / uDocument.x;
							msize.y = uTransition.w;
							coord.x = vUv.x - .5 + .001;
							coord.y = vUv.y + .5 * ( 1. - uTransition.w ) * uDir;
							col = vec3( rect( coord, msize ) );
							mask += col;
						}
					}

					
					float mixf = clamp( mask.r, 0.0, 1.0 );
					
					vec3 color = mix( visualOut, visualIn, mixf ).rgb;


					if ( uActiveNoise == 1. ) {

						float b = random2d( vUv * 200.0 + uTime ) - 0.5;
						
						color += b * uAmount;
					}


					gl_FragColor = vec4( color, 1.0 );
				}
			`
    };
  }
}
