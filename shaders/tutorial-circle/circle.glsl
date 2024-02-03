#version 300 es
precision highp float;
// Standard matrix-engine params
in vec2 vTextureCoord;
in vec3 vLightWeighting;
uniform sampler2D uSampler;

uniform vec2 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform int iFrame;
uniform vec3 iMouse;

out vec4 outColor;


float sdCircle(in vec2 p, in float r) {
  return length(p) - r;
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {
  vec2 p = (2.0f * fragCoord - iResolution.xy) / iResolution.y;
  vec2 m = (2.0f * iMouse.xy - iResolution.xy) / iResolution.y;

  float d = sdCircle(p, 0.5f);

    // coloring
  vec3 col = (d > 0.0f) ? vec3(0.9f, 0.6f, 0.3f) : vec3(0.65f, 0.85f, 1.0f);
  col *= 1.0f - exp(-6.0f * abs(d));
  col *= 0.8f + 0.2f * cos(150.0f * d);
  col = mix(col, vec3(1.0f), 1.0f - smoothstep(0.0f, 0.01f, abs(d)));
  if(iMouse.z > 0.001f) {
    d = sdCircle(m, 0.5f);
    col = mix(col, vec3(1.0f, 1.0f, 0.0f), 1.0f - smoothstep(0.0f, 0.005f, abs(length(p - m) - abs(d)) - 0.0025f));
    col = mix(col, vec3(1.0f, 1.0f, 0.0f), 1.0f - smoothstep(0.0f, 0.005f, length(p - m) - 0.015f));
  }
  outColor = vec4(col, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}