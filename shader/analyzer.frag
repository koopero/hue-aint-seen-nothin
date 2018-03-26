#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/src.glsl"
#include "ofxLoopin/compatible.glsl"

uniform float splitY = 0.5;
uniform float lineThick = 0.02;


float line( float value ) {
  float yVal = ( srcCoord.y - splitY ) / ( 1.0 - splitY );
  yVal = 1.0 - yVal;
  yVal -= 0.5;
  yVal /= 0.75;
  yVal += 0.5;
  return max( 0.0, 1.0 - abs( yVal - value) / lineThick );
}

void main() {
  vec4 src = Texture( srcSampler, vec2( srcCoord.x, 0.0 ) );

  OUT.a = 1.0;
  if ( srcCoord.y < splitY ) {
    OUT.rgb = src.rgb;
    return;
  }


  OUT.rgb = vec3(0.0,0.0,0.0);

  OUT.rgb += vec3(1,1,1) * line( 0.0 ) * 0.3;
  OUT.r += line( src.r );
  OUT.g += line( src.g );
  OUT.b += line( src.b );
  OUT.rgb += vec3(1,1,1) * line( 1.0 ) * 0.3;
}