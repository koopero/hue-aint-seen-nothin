#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/src.glsl"
#include "ofxLoopin/compatible.glsl"

uniform float splitY = 0.5;
uniform float lineThick = 0.02;

uniform vec3 powerWhite = vec3( 1.0,1.0,1.0); 

float line( float value ) {
  float yVal = ( srcCoord.y - splitY ) / ( 1.0 - splitY );
  yVal = 1.0 - yVal;
  yVal -= 0.5;
  yVal /= 0.75;
  yVal += 0.5;
  return max( 0.0, 1.0 - abs( yVal - value) / lineThick );
}

void main() {
  float x = srcCoord.x;
  vec4 src = Texture( srcSampler, vec2( srcCoord.x, 0.0 ) );

  OUT.a = 1.0;
  if ( srcCoord.y < splitY ) {
    OUT.rgb = src.rgb;
    return;
  }

  vec3 powerRGB = src.rgb * powerWhite;
  powerRGB = clamp( powerRGB, 0, 1 );
  float power = ( powerRGB.r + powerRGB.g + powerRGB.b ) / ( powerWhite.r + powerWhite.g + powerWhite.b );

  OUT.rgb = vec3(0.0,0.0,0.0);
  OUT.rgb += vec3(1,1,1) * line( 0.0 ) * 0.3;
  OUT.rgb += vec3(1,1,1) * line( power ) * 0.4;

  OUT.r += line( src.r );
  OUT.g += line( src.g );
  OUT.b += line( src.b );
  OUT.rgb += vec3(1,1,1) * line( 1.0 ) * 0.3;
}