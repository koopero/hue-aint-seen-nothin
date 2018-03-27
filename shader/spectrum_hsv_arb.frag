#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/clock.glsl"


uniform float saturation  = 0.5;
uniform float value       = 1.0;
uniform vec3  white       = vec3(1.0,1.0,1.0);

uniform sampler2D paletteSampler;
uniform int paletteWidth;

vec3 paletteSample( float x ) {
  // Compensate for GL linear putting pixel boundaries at 0.5
  x += 0.5 / float( paletteWidth );
  return Texture( paletteSampler, vec2( x, 0.0 ) ).rgb;
}

void main() {
  float hue = srcCoord.x;
 
  vec3 rgb = paletteSample( hue );

  OUT.rgb = rgb * saturation * value;
  OUT.rgb += white * value - saturation * value;

}