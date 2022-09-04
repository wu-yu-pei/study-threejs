// Vertex
varying vec2 vUv;

uniform sampler2D uTexture;

void main() {
  // gl_FragColor = vec4(vUv, 0.0, 1.0);

  // 根据uv取出颜色
  vec4 textureColor = texture2D(uTexture, vUv);
  gl_FragColor = textureColor;
}