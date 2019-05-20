export const Chunk = {
  precision: {
    highp: `precision highp float;`
  },

  define: {
    PI: `#define PI 3.14159265359`
  },

  math: {
    translate: `

			mat4 translate ( vec3 v ) {
				return mat4( vec4(1.0,0.0,0.0,0.0), vec4(0.0,1.0,0.0,0.0), vec4(0.0,0.0,1.0,0.0), vec4(v.x,v.y,v.z,1.0) );
			}
		`,

    rotate: `

			mat4 rotate ( vec3 v ) {
				mat4 rx = mat4( vec4(1.0,0.0,0.0,0.0), vec4(0.0,cos(v.x),-sin(v.x),0.0), vec4(0.0,sin(v.x),cos(v.x),0.0), vec4(0.0,0.0,0.0,1.0) );
				mat4 ry = mat4( vec4(cos(v.y),0.0,sin(v.y),0.0), vec4(0.0,1.0,0.0,0.0), vec4(-sin(v.y),0.0,cos(v.y),0.0), vec4(0.0,0.0,0.0,1.0) );
				mat4 rz = mat4( vec4(cos(v.z),-sin(v.z),0.0,0.0), vec4(sin(v.z),cos(v.z),0.0,0.0), vec4(0.0,0.0,1.0,0.0), vec4(0.0,0.0,0.0,1.0) );
				return rx * rz * ry;
			}
		`,

    scale: `

			mat4 scale ( vec3 v ) {
				return mat4( vec4(v.x,0.0,0.0,0.0), vec4(0.0,v.y,0.0,0.0), vec4(0.0,0.0,v.z,0.0), vec4(0.0,0.0,0.0,1.0) );
			}
		`,

    transform: `

			mat4 transform ( vec3 t, vec3 r, vec3 s ) {
				mat4 ms = scale( s );
				mat4 mt = translate( t );
				mat4 mr = rotate( r );
				return mt * mr * ms;
			}
		`,

    random2d: `
		
			float random2d( vec2 n ) { 
				return fract( sin( dot( n, vec2( 12.9898, 4.1414 ) ) ) * 43758.5453 );
			}
		`
  },

  shapes: {
    rect: `

			float rect( in vec2 _st, in vec2 _size ) {
					
				_size = vec2( 0.5 ) - _size * 0.5;
				
				vec2 uv = smoothstep( _size, _size + vec2( 0.001 ), _st );
				
				uv *= smoothstep( _size, _size + vec2( 0.001 ), vec2( 1.0 ) - _st );
				
				return uv.x * uv.y;
			}
		`,

    circle: `
			
			vec3 circle ( vec3 col, float rad, float blur, vec2 pos, vec2 uv ) {

				float dis = length( uv - pos );

				return col * ( 1. - smoothstep( rad * blur, rad, dis ) );
			}
		`
  },

  noise: {},

  mats: {
    phong: {
      vs: {
        defs: `
					
					#define PHONG
					#define USE_MAP
					#define USE_COLOR
					#define USE_ENVMAP
					#define FLAT_SHADED
					#define ENVMAP_TYPE_SPHERE
					#define ENVMAP_MODE_REFLECTION
					#define ENVMAP_BLENDING_MULTIPLY

					varying vec3 vViewPosition;

					#ifndef FLAT_SHADED

						varying vec3 vNormal;

					#endif

					#include <common>
					#include <uv_pars_vertex>
					#include <uv2_pars_vertex>
					#include <displacementmap_pars_vertex>
					#include <envmap_pars_vertex>
					#include <color_pars_vertex>
					#include <fog_pars_vertex>
					#include <morphtarget_pars_vertex>
					#include <skinning_pars_vertex>
					#include <shadowmap_pars_vertex>
					#include <logdepthbuf_pars_vertex>
					#include <clipping_planes_pars_vertex>
				`,

        head: `
					
					#include <uv_vertex>
					#include <uv2_vertex>
					#include <color_vertex>

					#include <beginnormal_vertex>
					#include <morphnormal_vertex>
					#include <skinbase_vertex>
					#include <skinnormal_vertex>
					#include <defaultnormal_vertex>

				#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

					vNormal = normalize( transformedNormal );

				#endif

					#include <begin_vertex>
				`,

        foo: `
					
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <displacementmap_vertex>

					#include <project_vertex>

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>

					vViewPosition = - mvPosition.xyz;

					#include <worldpos_vertex>
					#include <envmap_vertex>
					#include <shadowmap_vertex>
					#include <fog_vertex>
				`
      },

      fs: {
        defs: `

					#define PHONG
					#define USE_MAP
					#define USE_COLOR
					#define USE_ENVMAP
					#define FLAT_SHADED
					#define ENVMAP_TYPE_SPHERE
					#define ENVMAP_MODE_REFLECTION
					#define ENVMAP_BLENDING_MULTIPLY

					uniform vec3 diffuse;
					uniform vec3 emissive;
					uniform vec3 specular;
					uniform float shininess;
					uniform float opacity;

					#include <common>
					#include <packing>
					#include <dithering_pars_fragment>
					#include <color_pars_fragment>
					#include <uv_pars_fragment>
					#include <uv2_pars_fragment>
					#include <map_pars_fragment>
					#include <alphamap_pars_fragment>
					#include <aomap_pars_fragment>
					#include <lightmap_pars_fragment>
					#include <emissivemap_pars_fragment>
					#include <envmap_pars_fragment>
					#include <gradientmap_pars_fragment>
					#include <fog_pars_fragment>
					#include <bsdfs>
					#include <lights_pars>
					#include <lights_phong_pars_fragment>
					#include <shadowmap_pars_fragment>
					#include <bumpmap_pars_fragment>
					#include <normalmap_pars_fragment>
					#include <specularmap_pars_fragment>
					#include <logdepthbuf_pars_fragment>
					#include <clipping_planes_pars_fragment>
				`,

        head: `
					
					#include <clipping_planes_fragment>

					vec4 diffuseColor = vec4( diffuse, opacity );
					ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
					vec3 totalEmissiveRadiance = emissive;

					#include <logdepthbuf_fragment>
					//#include <map_fragment>
					#include <color_fragment>
					#include <alphamap_fragment>
					#include <alphatest_fragment>
					#include <specularmap_fragment>
					#include <normal_fragment>
					#include <emissivemap_fragment>

					// accumulation
					#include <lights_phong_fragment>
					#include <lights_template>

					// modulation
					#include <aomap_fragment>

					vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

					#include <envmap_fragment>
				`,

        foo: `
					
					#include <tonemapping_fragment>
					#include <encodings_fragment>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>
					#include <dithering_fragment>
				`
      }
    }
  }
};
