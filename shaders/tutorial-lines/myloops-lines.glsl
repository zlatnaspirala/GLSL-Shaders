#version 300 es
precision highp float;
// Standard matrix-engine params
in vec2 vTextureCoord;
in vec3 vLightWeighting;
uniform sampler2D uSampler;

uniform vec2 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform vec3 iMouse;

uniform float iXXX;
uniform float iR;
uniform float iG;
uniform float iB;

out vec4 outColor;

#define Thickness 0.003

float line(vec2 uv, vec2 pt1, vec2 pt2, vec2 iResolution) {
  float clrFactor = 0.0f;
  float tickness = 3.0f / max(iResolution.x, iResolution.y);
  float r = distance(uv, pt1) / distance(pt1, pt2);

  if(r <= 1.0f) {
    vec2 ptc = mix(pt1, pt2, r);
    float dist = distance(ptc, uv);
    if(dist < tickness / 2.0f) {
      clrFactor = 1.0f;
    }
  }
  return clrFactor;
}

void main() {

  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec3 color = vec3(.5f, 0.7f, 1.0f);
  // float sum = 0.0f;
  for(float i = 0.0f; i < 3.0f; i=i+0.01f) {
    vec2 pX = vec2(0.5f + i, 0.5f);
    vec2 pY = vec2(0.6f, 0.8f);
    float line = line(uv, pX, pY, iResolution.xy);
    outColor += vec4(color * line, 1.f);
    if(i >= 3.0f) {
      break;
    }
  }
  // outColor = vec4(color * lineFactor, 1.f);
  // outColor += vec4(color * lineFactor1, 1.f);
  // outColor.rgb *= color * lineFactor1;
}