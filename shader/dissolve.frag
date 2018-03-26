#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/src.glsl"

void main() {
  vec4 src = Texture( srcSampler, srcCoord );

  OUT.rgb = src.rgb;

  // Cheesy dissolve by blending src with tiny alpha.
  // Don't try this in 8-bit buffers!
  OUT.a = 0.03;
}

