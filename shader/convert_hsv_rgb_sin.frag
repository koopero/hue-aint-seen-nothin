#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/src.glsl"

// From http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

uniform float hueShift = 0.0;
uniform float satMult = 1.0;
uniform float satShift = 0.0;


uniform float saturation  = 0.5;
uniform float value       = 1.0;
uniform vec3  white       = vec3(1.0,1.0,1.0);

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
  vec4 src = Texture( srcSampler, srcCoord );

  src.r += hueShift;
  src.g *= satMult;
  src.g += satShift;

  // Negative saturation ain't gonna do us no good here 
  src.g = max( 0.0, src.g );

  OUT.a = src.a;

  float hue = src.r;
  float saturation = src.g;
  float value = src.b;

  vec3 rgb = hueToRGB(  hue );

  OUT.rgb = rgb * saturation * value;
  OUT.rgb += white * value - saturation * value;
}