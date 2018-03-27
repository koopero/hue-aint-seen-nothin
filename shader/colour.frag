#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/compatible.glsl"

uniform vec3 colour = vec3( 0,0,0);

void main() {
  OUT.rgb = colour.rgb;
}

