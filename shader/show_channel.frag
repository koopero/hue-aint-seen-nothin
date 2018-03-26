#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/src.glsl"

uniform int channel = 1;

void main() {
  vec4 src = Texture( srcSampler, srcCoord );

  OUT.a = src.a;

  OUT.rgb = src.rgb;

  if ( channel == 1 ) 
    OUT.rgb = src.rrr;

  if ( channel == 2 ) 
    OUT.rgb = src.ggg;

  if ( channel == 3 ) 
    OUT.rgb = src.bbb;
}