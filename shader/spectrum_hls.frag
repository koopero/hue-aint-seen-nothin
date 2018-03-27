#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/clock.glsl"


uniform float saturation = 1.0;
uniform float lightness  = 1.0;

vec3 hueToRGB( float hue ) {
  hue = fract( hue );
  hue *= 6.0;
  float sliceA = fract( hue );
  float sliceB = 1.0 - sliceA;

  // Red -> Yellow
  if ( hue < 1.0 ) return vec3( 1.0, sliceA, 0.0 );

  // Yellow -> Green  
  if ( hue < 2.0 ) return vec3( sliceB, 1.0, 0.0 );

  // Green -> Cyan  
  if ( hue < 3.0 ) return vec3( 0.0, 1.0, sliceA );

  // Cyan -> Blue  
  if ( hue < 4.0 ) return vec3( 0.0, sliceB, 1.0 );

  // Blue -> Magenta  
  if ( hue < 5.0 ) return vec3( sliceA, 0.0, 1.0 );

  // Magenta -> Red
  return vec3( 1.0, 0.0, sliceB );
}

void main() {
  float hue = srcCoord.x;
  // OUT.r = hue;

  float l = lightness;
  float s = saturation;
  float q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  float p = 2 * l - q;

  OUT.rgb = hueToRGB( hue ) * ( q - p ) + p;
}