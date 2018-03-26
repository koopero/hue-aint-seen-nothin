#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/clock.glsl"


uniform float saturation = 0.5;
uniform float value  = 1.0;
uniform vec3 shift = vec3(0,0,0);
uniform float power = 1.0;

const float PI = 3.1415926;

float sinusoidalChannel( float hue, float offset ) {
  return pow( cos( ( hue - offset ) * PI * 2.0 ) * 0.5 + 0.5, power ); 
}

vec3 hueToRGB( float hue ) {
  return vec3( 
    sinusoidalChannel( hue, shift.r / 360 ),
    sinusoidalChannel( hue, shift.g / 360 ),
    sinusoidalChannel( hue, shift.b / 360 )
  );
}

void main() {
  float hue = srcCoord.x;
 
  OUT.rgb = vec3( value, value, value );
  OUT.rgb = hueToRGB( hue ) * saturation * value;
  OUT.rgb += value - saturation * value;
}