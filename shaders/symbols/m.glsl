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
  float clrFactor = 0.1f;
  float tickness = iXXX*0.1 / max(iResolution.x, iResolution.y);
  float r = distance(uv, pt1) / distance(pt1, pt2);

  float r2 = distance(uv, pt2) / distance(pt2, pt1);

  if(r <= .90f && r2 <= 0.90f) {
    vec2 ptc = mix(pt1, pt2, r);
    float dist = distance(ptc, uv);
    if(dist < tickness / 2.0f) {
      clrFactor = 2.0f;
    }
  }
  return clrFactor;
}

void createLines() {

}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy; // current point

  vec2 pt1 = vec2(0.5f, 0.7f);
  vec2 pt2 = vec2(0.62f, 0.3f);

  vec2 pt11 = vec2(0.5f, 0.7f);
  vec2 pt21 = vec2(0.38f, 0.3f);

  vec2 pt12 = vec2(0.43f, 0.46f);
  vec2 pt22 = vec2(0.57f, 0.46f);

  float lineFactor = line(uv, pt1, pt2, iResolution.xy);
  float lineFactor1 = line(uv, pt11, pt21, iResolution.xy);
  float lineFactor2 = line(uv, pt12, pt22, iResolution.xy);
  vec3 color = vec3(.5f, 0.7f, 1.0f);

  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);

  outColor = vec4(color * lineFactor, 1.f);
  outColor += vec4(color * lineFactor1, 1.f);
  outColor += vec4(color * lineFactor2, 1.f);

  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
  // outColor.rgb *= color * lineFactor1;
}